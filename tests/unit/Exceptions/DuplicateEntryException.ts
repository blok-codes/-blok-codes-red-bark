import { DuplicateEntryException } from '../../../app/Exceptions/DuplicateEntryException';
import { levels } from '../../../config/Settings';

describe('DuplicateEntryException', () => {
    it('should have the right message, name, log level and status code', () => {
        const exception = new DuplicateEntryException('message', { key: 'value' });

        expect(exception.message).toEqual('Duplicate message as {"key":"value"}');
        expect(exception.name).toEqual('DuplicateEntryException');
        expect(exception.level).toEqual(levels.warning);
        expect(exception.code).toEqual('409');
    });
});
