import dotenv from 'dotenv';
import path from 'path';
import { format } from 'winston';

import { env } from './env-loader';
import { levels, Settings } from './Settings';

const relativePath = env('NODE_ENV') === 'production' ? '../..' : '..';
const { name, version } = require(`${relativePath}/package.json`);

process.env.npm_package_name = name;
process.env.npm_package_version = version;

if (process.env.NODE_ENV && ['development', 'test'].includes(process.env.NODE_ENV)) {
    dotenv.config({ path: path.resolve(process.cwd(), '.env') });
}

const config: Settings = {
    app: {
        name: env('APP_NAME', name),
        version: env('APP_VERSION', version),
        env: env('NODE_ENV', 'development'),
    },
    features: {},
    log: {
        level: levels.debug,
        rotation: {
            datePattern: 'YYYY-MM-DD-HH',
            dirname: path.resolve(__dirname, `${relativePath}/logs`),
            filename: 'app-%DATE%.log',
            format: format.logstash(),
            json: true,
            maxFiles: '7d', // max log files duration
            maxSize: '20m',
            zippedArchive: true,
        },
    },
    shutdownWaitTimeout: +env('SHUTDOWN_WAIT_TIMEOUT', 10), // seconds
};

export = config;
