import { Level, levels } from '../../config/Settings';

export class Exception extends Error {
    public readonly code: string;
    public readonly name: string;

    public readonly level: Level;

    constructor(message: string, code = '500', level = levels.error) {
        super(message);

        this.name = this.constructor.name;

        this.code = code;
        this.level = level;

        // remove creating this error from stack trace
        Error.captureStackTrace(this, this.constructor);
    }
}
