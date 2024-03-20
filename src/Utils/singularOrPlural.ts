export function singularOrPlural(isPlural: boolean, noun: [string, string]) {
    return isPlural ? noun[1] : noun[0];
}
