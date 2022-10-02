import { buildLogger } from '../../../app/Utils/Logger';

const settings = {
    getTyped: jest.fn((key: string): any =>
        key === 'app'
            ? { name: 'test' }
            : {
                  level: 'info',
                  rotation: { dirname: './logs', filename: 'app-%DATE%.log' },
              }
    ),
} as any;

const createLogger = jest.fn((options: any) => ({} as any));
const addColors = jest.fn((options: any) => ({} as any));

jest.mock('winston', () => {
    const winston = jest.requireActual('winston');

    return {
        ...winston,
        addColors: (options: any) => addColors(options),
        createLogger: (options: any) => createLogger(options),
    };
});

describe('Logger', () => {
    afterAll(() => {
        jest.restoreAllMocks();
    });

    it('should create logger', () => {
        const logger = buildLogger(settings);

        expect(settings.getTyped).toHaveBeenCalledWith('log');
        expect(settings.getTyped).toHaveBeenCalledWith('app');

        expect(createLogger).toHaveBeenCalled();

        expect(addColors).toHaveBeenCalledWith({
            alert: 'yellow',
            crit: 'red',
            debug: 'blue',
            emerg: 'red',
            error: 'red',
            info: 'green',
            notice: 'yellow',
            warning: 'red',
        });

        expect(logger).toBeDefined();
    });
});
