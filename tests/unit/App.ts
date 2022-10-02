import { App } from '../../app/App';

const logger = {
    info: jest.fn((message: string) => void 0),
};

const handler = {
    handleErrors: jest.fn((): void => void 0),
    handleShutdown: jest.fn((): void => void 0),
};

const container = {
    get: <T = any>(key: string) => {
        if (key === 'Logger') return logger;
        return handler;
    },
} as any;

describe('App', () => {
    it('should be defined', () => {
        expect(App).toBeDefined();
    });

    it('should start', () => {
        new App(container).start();

        expect(logger.info).toHaveBeenCalledWith('🚀 Starting application...');
        expect(handler.handleErrors).toHaveBeenCalled();
        expect(handler.handleShutdown).toHaveBeenCalled();
    });
});
