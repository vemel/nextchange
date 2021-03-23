import { SectionTitles } from "./constants";
import { joinText, trimDedent } from "./utils";

export default class Section {
    title: string;
    body: string;

    constructor(title: string, body = "") {
        this.title = title.toLowerCase();
        this.body = trimDedent(body);
    }

    static isValidTitle(title: string): boolean {
        const titles: Array<string> = Object.values(SectionTitles);
        return titles.includes(title.toLowerCase());
    }

    renderTitle(): string {
        return `### ${this.title[0].toUpperCase()}${this.title.substr(1)}`;
    }

    render(): string {
        if (this.body) {
            return `${this.renderTitle()}\n${this.body}`;
        }
        return this.renderTitle();
    }

    isEmpty(): boolean {
        return this.body.length === 0;
    }

    append(text: string): Section {
        this.body = `${this.body}${text}`;
        return this;
    }

    appendLines(text: string): Section {
        this.body = joinText("\n", this.body, text);
        return this;
    }

    set(text: string): Section {
        this.body = trimDedent(text);
        return this;
    }
}
