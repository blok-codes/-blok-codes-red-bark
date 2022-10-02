import { levels } from '../Utils/Settings';
import { Exception } from './Exception';

export class NotFoundException extends Exception {
    constructor(message: string) {
        super(message, '404', levels.warning);
    }
}
