const ISOtoLocal = (date) => {
    if (!!date) return new Date(date).getTime() + 9 * 60 * 60 * 1000;
}

export const functions = {
    ISOtoLocal,
}