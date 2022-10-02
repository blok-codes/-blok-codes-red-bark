import { inject, injectable } from 'inversify';
import { Logger } from 'winston';

import { Settings } from './Settings';

@injectable()
export class ProcessHandler {
    constructor(
        @inject('Logger') private readonly logger: Logger,
        @inject('Settings') private readonly settings: Settings
    ) {}

    public readonly handleErrors = (): void => {
        this.handleExceptions();
        this.handleRejections();
    };

    public readonly handleShutdown = (): void => {
        process.on('SIGINT', this.shutdown);
        process.on('SIGTERM', this.shutdown);
    };

    private readonly handleExceptions = (): void => {
        process.on('uncaughtException', (error: Error) => {
            this.logger.error(error.message, error);
            process.exit(1);
        });
    };

    private readonly handleRejections = (): void => {
        process.on('unhandledRejection', (error: Error) => {
            this.logger.error(error.message, error);
            process.exit(1);
        });
    };

    private readonly shutdown = async (): Promise<void> => {
        this.logger.info('🛑 Shutting down application...');
        const timeout = this.settings.getTyped('shutdownWaitTimeout');

        await new Promise((resolve) => setTimeout(resolve, timeout))
            .then(() => process.exit(1))
            .catch((error) => {
                this.logger.error('🤦🏽💥 Error while shutting down application :', error);
                process.exit(0);
            });
    };
}
