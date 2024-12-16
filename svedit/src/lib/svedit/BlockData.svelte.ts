import type {
    AnnText,
    BlockType,
    FlowType,
    ImageLayoutType,
    Path,
    PathIndex,
    Success,
} from "$lib/svedit/types"
import type SveditSession from "$lib/svedit/SveditSession.svelte";

export default class BlockData {
    // Definition
    type: BlockType; 
    uuid: string;
    name: string;

    // Rendering
    editable: boolean = $state(false);
    flow: FlowType = $state('inline');
    extra_css_class: string = $state(""); // easy to update
    editable_css_class: string = $derived(
        this.editable ? "bg-white opacity-100" : "bg-gray-50 opacity-90"
    );
    css_class: string = $derived(`${this.editable_css_class} ${this.extra_css_class}`)

    // Content
    title?: AnnText = $state();
    text?: AnnText = $state();
    image?: string = $state();
    image_layout: ImageLayoutType = $state('right');
    children: BlockData[] = $state([]);

    // Default block data starts as root node with
    // null parent and empty path
    parent: BlockData | null = $state(null);
    path: Path = $state([]);
    session: SveditSession | null = $state(null);


    constructor(
        {
            type,
            name,
            editable,
            title,
            text,
            image,
            layout,
            children,
            extra_css_class,
        } : {
            type: BlockType,
            name?: string,
            editable?: boolean,
            title?: AnnText,
            text?: AnnText,
            image?: string,
            layout?: ImageLayoutType,
            children?: any[],
            extra_css_class?: string,
        }
    ) {
        this.type = type;
        this.uuid = crypto.randomUUID();
        this.name = name ? name : `${this.type}-${this.uuid}`;
        if (editable !== undefined) {
            this.editable = editable;
        }
        if (title !== undefined) {
            this.title = title;
        }
        if (text !== undefined) {
            this.text = text;
        }
        if (children !== undefined) {
            this.children = children;
        }
        if (image !== undefined) { 
            this.image = image;
        }
        if (layout !== undefined) {
            this.image_layout = layout;
        }
        if (extra_css_class !== undefined) {
            this.extra_css_class = extra_css_class;
        }
    }

    get repStr(): string {
        return `${this.editable ? "editable" : "fixed"} ${this.type} ${this.name} Parent: ${this.parent?.name}`;
    }

    setSessionOnChildren(mySession: SveditSession): void {
        this.session = mySession;
        for (const child of this.children) {
            child.setSessionOnChildren(mySession);
        }
    }

    setParentOnChildren(myParent: BlockData | null): void {
        this.parent = myParent;
        for (const child of this.children) {
            child.setParentOnChildren(this);
        }
    }

    setPathOnChildren(myPath: Path): void {
        this.path = myPath;
        for (const [index, child] of this.children.entries()) {
            child.setPathOnChildren([...myPath, "children", index]);
        }
    }

    validateIndexAgainstParent(): boolean {
        // Handle root nodes differently
        if (this.parent === null) {
            if (this.path.length != 0) {
                console.error("Root node should have empty path");
                return false;
            }
            return true;
        }

        // Verify that indices in the parent.children array match
        let expectedIndex = this.path[this.path.length - 1];
        let actualIndex = this.parent.children.indexOf(this);
        if (actualIndex === undefined ){
            console.error("Block not found in parent's children");
            return false;
        } else if (expectedIndex !== actualIndex) {
            console.error(`Expected index ${expectedIndex} but got ${actualIndex}`);
            return false;
        } else if (actualIndex < 0 || actualIndex >= this.parent.children.length) {
            console.error(`Index ${actualIndex} out of range for ${this.parent.name}`);
            return false;
        }
        return true;
    }

    addChildBlock(): Success {
        return this.addChildBlockAtIndex(-1);
    }

    // All actual removal logic happens here
    removeChildBlockAtIndex(index: number): Success {
        this.session?.takeStateSnapshot();
        console.log("Parent's children before remove: ", $state.snapshot(this.children))

        // Index of -1 is invalid for removal
        if (index < 0 || index >= this.children.length) {
            console.error(`Index ${index} out of range for ${this.name}`);
            this.session?.clearStateSnapshot(); 
            return false;
        }

        // Remove block and update its path/parent and its children
        this.children = [
            ...this.children.slice(0, index),
            ...this.children.slice(index + 1),
        ]

        // Update the path on all remaining children of this block
        this.setPathOnChildren(this.path);
        console.log("Parent's children after remove: ", $state.snapshot(this.children))
        this.session?.finalizePendingHistory();
        return true;
    }

    // All actual adding logic happens here
    // NOTE: this has to be an assignment to trigger rerendering
    addChildBlockAtIndex(index: number) : Success {
        this.session?.takeStateSnapshot();

        // Index of -1 represents pushing to end of array for addition
        let realIndex = index;
        if (realIndex === -1 ){
            realIndex = this.children.length;
        } else if (realIndex < 0 || realIndex >= this.children.length) {
            console.error(`Index ${index} out of range for ${this.name}`);
            this.session?.clearStateSnapshot();
            return false;
        }
        
        // Create the block and set it's parent
        const newBlock = new BlockData({
            type: 'unknown',
            editable: true,
        })
        newBlock.parent = this

        // Add block to children and update all children paths
        // NOTE: this has to be an assignment to trigger rerendering
        this.children = [
            ...this.children.slice(0, realIndex),
            newBlock,
            ...this.children.slice(realIndex),
        ]
        this.setPathOnChildren(this.path);
        this.session?.finalizePendingHistory();
        return true;
    }

    // Helper function that wraps adding/removing functionality
    removeSelfFromParent() : Success {
        console.log("Removing block: ", this.repStr)
        // Cannot remove root node from parent
        if (this.parent === null) {
            console.error("Cannot remove root node from parent");
            return false;
        }
        // Path index should match parent.children index
        if (!this.validateIndexAgainstParent()) {
            return false;
        }

        // Remove self from parent's children array
        let removeSuccess = this.parent.removeChildBlockAtIndex(
            this.parent.children.indexOf(this)
        );
        if (!removeSuccess) {
            console.error("Unexpected error, passed index validation but removal failed");
            return false;
        }
        return true;
    }

    // Helper function that wraps adding/removing functionality
    addBlockAbove() : Success {
        console.log("Adding block above: ", this.repStr)
        // Cannot add block above root node
        if (this.parent === null) {
            console.error("Cannot add block above root node");
            return false;
        } else if (!this.validateIndexAgainstParent()){
            return false;
        }

        // Insert new block at current index
        return this.parent.addChildBlockAtIndex(
            this.parent.children.indexOf(this)
        );
    }

    // Helper function that wraps adding/removing functionality
    addBlockBelow() : Success {
        console.log("Adding block below: ", this.repStr)
        // Cannot add block below root node
        if (this.parent === null) {
            return false;
        } else if (!this.validateIndexAgainstParent()) {
            return false;
        }

        return this.parent.addChildBlockAtIndex(
            this.parent.children.indexOf(this) + 1
        );
    }
}