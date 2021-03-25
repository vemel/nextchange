import Release from "./release";
export default class ChangeLog {
    header: string;
    unreleased: Release;
    releases: Array<Release>;
    isCRLF: boolean;
    constructor(header?: string, unreleased?: Release, releases?: Array<Release>);
    static parse(text: string): ChangeLog;
    static read(path: string, encoding?: string): ChangeLog;
    getRelease(version: string): Release | null;
    getOrCreateRelease(version: string): Release;
    renderReleases(): string;
    render(): string;
    write(path: string, encoding?: string): void;
    static readOrCreate(path: string, encoding?: string): ChangeLog;
}
