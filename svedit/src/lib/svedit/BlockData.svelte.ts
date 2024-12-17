import type {
    AnnText,
    BlockType,
    FlowType,
    ImageLayoutType,
    Success,
    Path,
    MarkdownSetting,
} from "$lib/svedit/types"
import {marked} from "marked";
import type SveditSession from "$lib/svedit/SveditSession.svelte";

export default class BlockData {
    // Definition
    type: BlockType = $state('unknown'); 
    uuid: string;

    // Rendering
    editable: boolean = $state(true);
    flow: FlowType = $state('inline');
    extra_css_class: string = $state(""); // easy to update
    editable_css_class: string = $derived(
        this.editable ? "bg-white opacity-100" : "bg-gray-50 opacity-90"
    );
    css_class: string = $derived(`${this.editable_css_class} ${this.extra_css_class}`)

    markdown: string = $state("");
    markdown_setting: MarkdownSetting = $state("both");

    // Content
    title?: AnnText = $state();
    text?: AnnText = $state();
    image?: string = $state();
    image_layout: ImageLayoutType = $state('right');
    children: BlockData[] = $state([]);

    // Default block data starts as root node with
    // null parent
    parent: BlockData | null = $state(null);
    session: SveditSession | null = $state(null);

    constructor(
        {
            type,
            markdown,
            parent,
            editable,
            title,
            text,
            image,
            layout,
            children,
            extra_css_class,
        } : {
            type: BlockType,
            markdown?: string,
            parent?: BlockData | null,
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
        if (markdown !== undefined) {
            this.markdown = markdown;
            this.markdown_setting = "preview";
        }
        if (parent !== undefined) {
            this.parent = parent;
        }
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

    get name(): string {
        return `${this.type}-${this.uuid}`;
    }

    get repStr(): string {
        return `${this.editable ? "editable" : "fixed"} ${this.type} ${this.name} Parent: ${this.parent?.name}`;
    }

    get renderedMarkdown(): string {
        return marked(this.markdown);
    }
    
    setType(newType: BlockType): void {
        this.session?.takeStateSnapshot();
        this.type = newType;
        if (this.type == "markdown") {
            this.markdown_setting = "both";
        }
        this.session?.finalizePendingHistory();
    }

    get path(): Path {
        // The root node has no path, its the parent
        if (this.parent === null) {
            return [];
        }

        // Build the path
        let path: Path = [];
        let currentBlock: BlockData | null = this;
        while (currentBlock !== null) {
            let parent: BlockData | null = currentBlock.parent;
            if (parent === null) {
                break;
            }
            let index = parent.children.indexOf(currentBlock);
            path.push(index);
            currentBlock = parent;
        }
        return path.reverse();
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

    addChildBlock(): void {
        this.addChildBlockAtIndex(this.children.length);
    }

    // All actual removal logic happens here
    removeChildBlock(uuid: string): void{
        this.session?.takeStateSnapshot();
        this.children = this.children.filter(child => child.uuid !== uuid)
        this.session?.finalizePendingHistory();
    }

    // All actual adding logic happens here
    addChildBlockAtIndex(index: number): void {
        if (index < 0 || index > this.children.length) {
            throw new RangeError(`Index out of range: ${index} vs ${this.children.length}`);
        }

        // NOTE: this has to be an assignment to trigger re-rendering
        this.session?.takeStateSnapshot();
        this.children = [
            ...this.children.slice(0, index),
            new BlockData({type: 'unknown', parent: this}),
            ...this.children.slice(index),
        ]
        this.session?.finalizePendingHistory();
    }

    // Helper function that wraps adding/removing functionality
    removeSelfFromParent() : void {
        if (this.parent === null) {
            throw TypeError("Expected parent to be non-null");
        }
        if (!this.parent.children.includes(this)) {
            throw TypeError("Expected parent to have child");
        }

        // Remove self from parent's children array
        this.parent.removeChildBlock(this.uuid);
    }

    // Helper function that wraps adding/removing functionality
    addBlockAbove() : void {
        // Cannot add block above root node
        if (this.parent === null) {
            throw TypeError("Expected parent to be non-null");
        }
        if (!this.parent.children.includes(this)) {
            throw TypeError("Expected parent to have child");
        }

        // Insert new block at current index
        return this.parent.addChildBlockAtIndex(
            this.parent.children.indexOf(this)
        );
    }

    // Helper function that wraps adding/removing functionality
    addBlockBelow() : void {
        // Cannot add block below root node
        if (this.parent === null) {
            throw TypeError("Expected parent to be non-null");
        } 
        if (!this.parent.children.includes(this)) {
            throw TypeError("Expected parent to have child");
        }
        return this.parent.addChildBlockAtIndex(
            this.parent.children.indexOf(this) + 1
        );
    }
}