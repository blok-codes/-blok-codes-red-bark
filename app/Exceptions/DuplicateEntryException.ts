import { levels } from '../Utils/Settings';
import { Exception } from './Exception';

export class DuplicateEntryException extends Exception {
    constructor(message: string, details: unknown) {
        super(`Duplicate ${message} as ${JSON.stringify(details)}`, '409', levels.warning);
    }
}
