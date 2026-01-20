export type Tone = "fire" | "water" | "grass" | "electric" | "psychic" | undefined;

export function formatId(id: number) {
    return String(id).padStart(3, "0");
}

export function formatName(name: string) {
    return name
        .split("-")
        .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
        .join(" ");
}

export function mapTypeToTone(type: string): Tone {
    const t = type.toLowerCase();
    if (t === "fire") return "fire";
    if (t === "water") return "water";
    if (t === "grass") return "grass";
    if (t === "electric") return "electric";
    if (t === "psychic") return "psychic";
    return undefined;
}
