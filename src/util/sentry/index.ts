export function errorWithContext(originalError: Error, context: string) {
    const errorWithContext = new Error(context);
    errorWithContext.stack =
        errorWithContext.stack.split('\n').slice(2, 4).join('\n') +
        '\n' +
        originalError.stack;
    return errorWithContext;
}

export const logError = (
    error: any,
    msg: string,
    info?: Record<string, unknown>
) => {
    console.log(error, { msg, info });
};
