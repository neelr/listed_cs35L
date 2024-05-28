const passwordRegex: RegExp = /^[^\s]{8,}$/;

export function isValidPassword(password: string): boolean {
    return passwordRegex.test(password);
}