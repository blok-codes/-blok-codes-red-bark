import 'reflect-metadata';
import { ProcessHandler } from '../../../app/Utils/ProcessHandler';

const logger = {
    info: jest.fn((message: string) => void 0),
    error: jest.fn((message: string, error: any) => void 0),
} as any;

const settings = {
    getTyped: jest.fn((key: string) => 1),
} as any;

const error = { message: 'test' } as any;
let handler: ProcessHandler;

let onHandler: jest.SpyInstance;
let exitHandler: jest.SpyInstance;

describe('ProcessHandler', () => {
    beforeAll(() => {
        exitHandler = jest.spyOn(process, 'exit').mockImplementation(null);

        onHandler = jest.spyOn(process, 'on').mockImplementation((event: any, callback: (...args: any[]) => any) => {
            callback(error);
            return {} as any;
        });

        handler = new ProcessHandler(logger, settings);
    });

    afterAll(() => {
        jest.restoreAllMocks();
    });

    it('should be defined', () => {
        expect(handler).toBeDefined();
    });

    it('should handle errors', () => {
        handler.handleErrors();
        expect(onHandler).toHaveBeenCalledWith('uncaughtException', expect.any(Function));
        expect(onHandler).toHaveBeenCalledWith('unhandledRejection', expect.any(Function));

        expect(exitHandler).toHaveBeenCalledWith(1);
        expect(logger.error).toHaveBeenCalledWith(error.message, error);
    });

    it('should handle shutdown', async () => {
        handler.handleShutdown();
        expect(onHandler).toHaveBeenCalledWith('SIGINT', expect.any(Function));
        expect(onHandler).toHaveBeenCalledWith('SIGTERM', expect.any(Function));

        await new Promise((resolve) => setTimeout(resolve, 3));

        expect(exitHandler).toHaveBeenCalledWith(1);
        expect(logger.info).toHaveBeenCalledWith('🛑 Shutting down application...');
    });
});
