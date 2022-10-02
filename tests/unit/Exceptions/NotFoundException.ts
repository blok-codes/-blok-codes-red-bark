import { NotFoundException } from '../../../app/Exceptions/NotFoundException';
import { levels } from '../../../config/Settings';

describe('NotFoundException', () => {
    it('should have the right message, name, log level and status code', () => {
        const exception = new NotFoundException('message');

        expect(exception.message).toEqual('message');
        expect(exception.name).toEqual('NotFoundException');
        expect(exception.level).toEqual(levels.warning);
        expect(exception.code).toEqual('404');
    });
});
