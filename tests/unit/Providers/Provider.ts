import { Provider } from '../../../app/Providers/Provider';

describe('Provider', () => {
    it('should be defined', () => {
        expect(Provider).toBeDefined();
    });

    it('should throw an error', () => {
        expect(() => {
            Provider.register();
        }).toThrowError('register function must be implemented');
    });
});
