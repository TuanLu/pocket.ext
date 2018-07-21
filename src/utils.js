// @flow

export const webext = typeof window.chrome !== undefined ? window.chrome : window.browser


export function validateJson(text: string): boolean {
    return Boolean(text && /^[\],:{}\s]*$/.test(text.replace(/\\["\\\/bfnrtu]/g, '@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, '')))
}

export function makeId() {
    return '_' + Math.random().toString(36).substr(2, 9);
}