type BaseArg = string | false | null | undefined
type Arg = BaseArg | readonly Arg[]

function ser(a: Arg): string {
    if (typeof a === 'string') { return a }
    if (Array.isArray(a)) { return cl(a) }
    return ''
}

export function cl(...x: readonly Arg[]): string {
    let s: string, l: unknown[] = []
    for (const a of x) {
        s = ser(a)
        if (s) { l.push(s) }
    }
    return l.join(' ')
}