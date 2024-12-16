import type {
    AnnText,
    BlockType,
    FlowType,
    ImageLayoutType,
    Path,
} from "$lib/svedit/types"

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
    children: any[] = $state([]);
    parent?: BlockData = $state();
    path?: Path = $state();


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

    setPathAndParentOnChildren(myPath: Path, myParent?: BlockData): void {
        // Set myself
        this.path = myPath;
        this.parent = myParent;

        // Set Children
        for (const [index, child] of this.children.entries()) {
            // Some form of validation
            if (!child || !("path" in child) || !("parent" in child)) {
                return;
            }

            child.setPathAndParentOnChildren(
                [...myPath, "children", index], // path
                this, // parent
            );
        }
    }
}