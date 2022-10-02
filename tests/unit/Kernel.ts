import { useContainer } from '@blok-codes/inversify-oclif-utils';
import { kernel } from '../../app/Kernel';
import { Registry } from '../../app/Registry';

jest.mock('../../app/Registry', () => ({
    Registry: {
        getContainer: jest.fn(() => ({})),
    },
}));

jest.mock('@blok-codes/inversify-oclif-utils', () => ({
    useContainer: jest.fn((container: any) => void 0),
}));

describe('Kernel', () => {
    afterAll(() => {
        jest.restoreAllMocks();
    });

    it('should be defined', () => {
        expect(kernel).toBeDefined();
    });

    it('should use container with registry', () => {
        expect(Registry.getContainer).toHaveBeenCalled();
        expect(useContainer).toHaveBeenCalledWith(kernel);
    });
});
