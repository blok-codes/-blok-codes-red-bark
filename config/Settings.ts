import { DailyRotateFileTransportOptions } from 'winston-daily-rotate-file';

/**
 * Logging levels in winston conform to the severity ordering specified by RFC5424
 * @link https://tools.ietf.org/html/rfc5424
 * @link https://github.com/winstonjs/winston#logging-levels
 */
export enum levels {
    alert = 'alert',
    crit = 'crit',
    debug = 'debug',
    emerg = 'emerg',
    error = 'error',
    info = 'info',
    notice = 'notice',
    warning = 'warning',
}

export type Level = keyof typeof levels;

export interface Settings {
    app: {
        env: string;
        name: string;
        version: string;
    };
    features: {
        [key: string]: boolean;
    };
    log: {
        level: Level;
        rotation: DailyRotateFileTransportOptions;
    };
    shutdownWaitTimeout: number;
}
