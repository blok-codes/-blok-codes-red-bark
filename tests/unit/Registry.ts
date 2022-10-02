import { Container } from 'inversify';
import { Registry } from '../../app/Registry';

let container: Container;
const registerProviders = jest.fn(() => void 0);

jest.mock('../../app/Registry', () => ({
    Registry: {
        getContainer: jest.fn(() => {
            if (!container) {
                container = new Container();
                registerProviders();
            }

            return container;
        }),
    },
}));

describe('Registry', () => {
    afterAll(() => {
        jest.restoreAllMocks();
    });

    it('should be defined', () => {
        expect(Registry).toBeDefined();
    });

    it('should register container', () => {
        const containerA = Registry.getContainer();
        const containerB = Registry.getContainer();

        expect(containerA).toBe(containerB);
        expect(registerProviders).toHaveBeenCalledTimes(1);
    });
});
