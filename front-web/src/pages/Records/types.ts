export type RecordsResponse = {
    content: RecordItem[],
    totalPages: number;
}

export type RecordItem = {
    id: number;
    moment: string;
    name: string;
    age: number;
    gameTitle: string;
    gamePlatform: PLatform;
    genreName: string;
}

export type PLatform = 'XBOX' | 'PC' | 'PLAYSTATION';