import { kernel } from '../../app/Kernel';

const start = jest.fn((): void => void 0);
const App = jest.fn((kernel: any) => ({ start }));

jest.mock('../../app/App', () => ({
    App,
}));

jest.mock('../../app/Kernel', () => ({
    kernel: {} as any,
}));

describe('bootstrap', () => {
    const { run } = require('../../app');

    afterAll(() => {
        jest.restoreAllMocks();
    });

    it('should be defined', () => {
        expect(run).toBeDefined();
    });

    it('should start', () => {
        expect(App).toHaveBeenCalledWith(kernel);
        expect(start).toHaveBeenCalled();
    });
});
