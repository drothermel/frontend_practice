export type Morsel = {
    title: string,
    text: string,
    tags: string[],
    time: Date,
}

export type MorselViewerContext = {
    uuid: string,
    tags: string[],
    morsels: Morsel[],
}