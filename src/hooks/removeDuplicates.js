export function removeDuplicates(existing, incoming) {
    const seen = new Set(existing.map((m) => m.id));
    return incoming.filter((m) => !seen.has(m.id));
}