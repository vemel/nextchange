export function trimLines(text: string): string {
    const lines: Array<string> = [];
    for (let line of text.split(/\r?\n/)) {
        line = line.trimRight();
        if (!line.length && !lines.length) continue;
        lines.push(line);
    }
    while (lines.length && lines[lines.length - 1].trim().length === 0)
        lines.pop();
    return lines.join("\n");
}

export function dedent(text: string): string {
    let offset = -1;
    let firstLine = true;
    const lines = text.split(/\r?\n/);
    for (const line of lines) {
        const lineOffset = line.length - line.trimLeft().length;
        if (firstLine) {
            if (line.length) offset = lineOffset;
            firstLine = false;
            continue;
        }
        if (offset < 0) {
            offset = lineOffset;
            continue;
        }
        if (offset > lineOffset) offset = lineOffset;
    }
    if (offset <= 0) return text;
    if (lines.length && lines[0].length === lines[0].trimLeft().length) {
        lines[0] = new Array(offset).fill(" ").join("") + lines[0];
    }
    return lines.map(line => line.substr(offset)).join("\n");
}

export function trimDedent(text: string): string {
    return dedent(trimLines(text));
}

export function joinText(sep: string, ...texts: Array<string>): string {
    return texts
        .map(x => trimDedent(x))
        .filter(x => x)
        .join(sep);
}
