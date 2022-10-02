import { Exception } from '../../../app/Exceptions/Exception';
import { levels } from '../../../config/Settings';

describe('Exception', () => {
    it('should have the right message, name, log level and status code', () => {
        const exception = new Exception('message');

        expect(exception.message).toEqual('message');
        expect(exception.name).toEqual('Exception');
        expect(exception.level).toEqual(levels.error);
        expect(exception.code).toEqual('500');
    });
});
