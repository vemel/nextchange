import ReleaseBody from "./releaseBody";

export default class Release {
    version: string;
    createdAt: string;
    body: ReleaseBody;
    constructor(
        version: string,
        createdAt = "",
        body: ReleaseBody | null = null
    ) {
        this.version = version;
        this.createdAt = createdAt;
        this.body = body || new ReleaseBody();
    }

    static parseTitle(title: string): [string, string] {
        const titleParts = title
            .split(" ")
            .map(x => x.trim())
            .filter(x => x);
        if (titleParts.length < 2) return ["", ""];
        const version = titleParts[1].replace("[", "").replace("]", "").trim();
        if (titleParts.length < 3) return [version, ""];
        const createdAt = titleParts.slice(3).join(" ");
        return [version, createdAt];
    }

    static parse(text: string): Release {
        const [title, body] = text.split(/\r?\n/, 2);
        const [version, createdAt] = Release.parseTitle(title);
        return new Release(version, createdAt, ReleaseBody.parse(body || ""));
    }

    renderTitle(): string {
        if (this.createdAt) return `## [${this.version}] - ${this.createdAt}`;
        return `## [${this.version}]`;
    }

    render(): string {
        return [this.renderTitle(), this.body.render()]
            .filter(x => x)
            .join("\n");
    }
}
