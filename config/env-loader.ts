export const env = (name: string, fallback: any = undefined): any => {
    if (process.env[name] === undefined) {
        if (fallback !== undefined) {
            return fallback;
        }

        throw new Error(`The environment variable: '${name}' is not defined`);
    }

    switch (process.env[name]) {
        case 'true':
            return true;
        case 'false':
            return false;
        default:
            return process.env[name];
    }
};
