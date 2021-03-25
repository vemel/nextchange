import Section from "./section";
export default class ReleaseBody {
    prefix: string;
    postfix: string;
    sections: Array<Section>;
    sectionTitles: Array<string>;
    constructor(sections?: Array<Section>, prefix?: string, postfix?: string);
    static parse(text: string): ReleaseBody;
    getSection(title: string): Section;
    getExistingSections(): Array<Section>;
    renderSections(): string;
    render(): string;
    isEmpty(): boolean;
    getTitles(): Array<string>;
    getLabel(): string;
    sanitize(): ReleaseBody;
    clear(): ReleaseBody;
    merge(other: ReleaseBody): ReleaseBody;
    replace(other: ReleaseBody): ReleaseBody;
    addSectionSuffix(suffix: string): ReleaseBody;
}
