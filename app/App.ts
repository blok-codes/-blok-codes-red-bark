import { Container } from 'inversify';
import { Logger } from 'winston';

import { ProcessHandler } from './Utils/ProcessHandler';

export class App {
    private container: Container;
    private handler: ProcessHandler;

    private logger: Logger;

    constructor(container: Container) {
        this.container = container;

        this.logger = this.container.get<Logger>('Logger');
        this.handler = this.container.get<ProcessHandler>('ProcessHandler');
    }

    public readonly start = (): void => {
        this.logger.info('🚀 Starting application...');

        this.handler.handleErrors();
        this.handler.handleShutdown();
    };
}
