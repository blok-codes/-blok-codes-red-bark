import { ContainerModule, interfaces } from 'inversify';
import { Logger } from 'winston';

import { buildLogger } from '../Utils/Logger';
import { ProcessHandler } from '../Utils/ProcessHandler';
import { Settings, settings } from '../Utils/Settings';
import { Provider } from './Provider';

export class UtilityProvider extends Provider {
    public static readonly register = (): ContainerModule =>
        new ContainerModule((bind) => {
            this.registerConfig(bind);
            this.registerLogger(bind);
            this.registerErrorHandler(bind);
        });

    private static readonly registerConfig = (bind: interfaces.Bind) =>
        bind<Settings>('Settings').toConstantValue(settings);

    private static readonly registerLogger = (bind: interfaces.Bind) =>
        bind<Logger>('Logger').toConstantValue(buildLogger(settings));

    private static readonly registerErrorHandler = (bind: interfaces.Bind) =>
        bind<ProcessHandler>('ProcessHandler').to(ProcessHandler).inSingletonScope();
}
