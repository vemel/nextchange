import ReleaseBody from "./releaseBody";
export default class Release {
    version: string;
    createdAt: string;
    body: ReleaseBody;
    constructor(version: string, createdAt?: string, body?: ReleaseBody | null);
    static parseTitle(title: string): [string, string];
    static parse(text: string): Release;
    renderTitle(): string;
    render(): string;
}
