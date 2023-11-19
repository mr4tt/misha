export function log(x: unknown) {
    if (x == null) {
        console.log('[[null]]')
    } else if (Array.isArray(x)) {
        console.log(x)
    } else if (typeof x === 'object') {
        console.log(JSON.stringify(x, null, 2))
    } else {
        console.log(x)
    }
}