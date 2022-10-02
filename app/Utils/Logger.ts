import { TransformableInfo } from 'logform';
import { addColors, config, createLogger, format, Logger, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import TransportStream from 'winston-transport';

import { levels, Settings } from './Settings';

const { align, combine, timestamp, colorize, printf } = format;

const formatter = (info: TransformableInfo): string => `${info.timestamp} ${info.level}: ${info.message}`;

export const buildLogger = (settings: Settings): Logger => {
    const options = settings.getTyped('log');

    let transportStreams: TransportStream[] = [
        new transports.Console({
            format: combine(align(), printf(formatter), colorize({ all: true })),
        }),
    ];

    if (settings.getTyped('app').env !== 'production') {
        transportStreams.push(new DailyRotateFile({ ...options.rotation, level: levels.info }));
        transportStreams.push(
            new DailyRotateFile({
                ...(options.rotation as any), // eslint-disable-line @typescript-eslint/no-explicit-any
                filename: 'error-%DATE%.log',
                level: levels.error,
            })
        );
    }

    const logger = createLogger({
        defaultMeta: settings.getTyped('app'),
        format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' })),
        handleExceptions: true,
        level: options.level,
        levels: config.syslog.levels,
        transports: transportStreams,
    });

    addColors(config.syslog.colors);

    return logger;
};
