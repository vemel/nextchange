export default class Section {
    title: string;
    body: string;
    constructor(title: string, body?: string);
    static isValidTitle(title: string): boolean;
    renderTitle(): string;
    render(): string;
    isEmpty(): boolean;
    append(text: string): Section;
    appendLines(text: string): Section;
    set(text: string): Section;
}
