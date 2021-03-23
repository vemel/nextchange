import { Labels, SECTION_TITLES, SectionTitles } from "./constants";
import Section from "./section";
import { joinText, trimDedent } from "./utils";

const RE_SECTION = /^### (\S+)/;

export default class ReleaseBody {
    prefix: string;
    postfix: string;
    sections: Array<Section>;
    sectionTitles: Array<string> = Object.values(SectionTitles);

    constructor(sections: Array<Section> = [], prefix = "", postfix = "") {
        this.prefix = trimDedent(prefix);
        this.postfix = trimDedent(postfix);
        this.sections = this.sectionTitles.map(title => new Section(title, ""));
        sections.map(section => {
            this.getSection(section.title).appendLines(section.body);
        });
    }

    public static parse(text: string): ReleaseBody {
        let isCodeblock = false;
        let sectionTitle = "prefix";
        const sectionsMap: Map<string, Array<string>> = new Map([
            ["prefix", []],
            ["postfix", []]
        ]);
        SECTION_TITLES.forEach(title => sectionsMap.set(title, []));

        for (const line of text.split(/\r?\n/)) {
            if (line.trim().startsWith("```")) {
                isCodeblock = !isCodeblock;
            }
            if (!isCodeblock && line.startsWith("#")) {
                const titleMatch = line.match(RE_SECTION);
                if (titleMatch) {
                    sectionTitle = titleMatch[1].toLowerCase();
                    continue;
                }
                if (sectionTitle !== "prefix") sectionTitle = "postfix";
            }
            const section = sectionsMap.get(sectionTitle);
            if (section) section.push(line);
        }
        const sections = SECTION_TITLES.map(
            title =>
                new Section(title, (sectionsMap.get(title) || []).join("\n"))
        );
        return new ReleaseBody(
            sections,
            (sectionsMap.get("prefix") || []).join("\n"),
            (sectionsMap.get("postfix") || []).join("\n")
        );
    }

    getSection(title: string): Section {
        const found = this.sections.filter(x => x.title === title);
        if (found.length) return found[0];
        throw new Error(`Section title ${title} is invalid`);
    }

    getExistingSections(): Array<Section> {
        return this.sections.filter(section => !section.isEmpty());
    }

    renderSections(): string {
        return this.getExistingSections()
            .map(section => section.render())
            .join("\n\n");
    }

    render(): string {
        return [this.prefix, this.renderSections(), this.postfix]
            .filter(x => x.length)
            .join("\n\n");
    }

    isEmpty(): boolean {
        if (this.prefix || this.postfix) return false;
        return this.getExistingSections().length === 0;
    }

    getTitles(): Array<string> {
        return this.getExistingSections().map(x => x.title);
    }

    getLabel(): string {
        const titles = this.getTitles();
        if (titles.includes(SectionTitles.Removed)) return Labels.Major;
        if (
            titles.includes(SectionTitles.Added) ||
            titles.includes(SectionTitles.Changed) ||
            titles.includes(SectionTitles.Deprecated)
        )
            return Labels.Minor;
        return Labels.Patch;
    }

    sanitize(): ReleaseBody {
        this.prefix = "";
        this.postfix = "";
        return this;
    }

    merge(other: ReleaseBody): ReleaseBody {
        this.prefix = joinText("\n", this.prefix, other.prefix);
        this.postfix = joinText("\n", this.postfix, other.postfix);
        other.sections.map(section => {
            this.getSection(section.title).appendLines(section.body);
        });
        return this;
    }

    addSectionSuffix(suffix: string): ReleaseBody {
        if (!suffix) return this;
        this.getExistingSections().forEach(section => section.append(suffix));
        return this;
    }
}
