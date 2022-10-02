import { Container } from 'inversify';

import { Provider } from './Providers/Provider';
import { ServiceProvider } from './Providers/ServiceProvider';
import { UtilityProvider } from './Providers/UtilityProvider';

export class Registry {
    private static container: Container;

    private static readonly providers: typeof Provider[] = [UtilityProvider, ServiceProvider];

    private static readonly registerProviders = (): void => {
        this.container.load(...this.providers.map((provider) => provider.register()));
    };

    public static readonly getContainer = (): Container => {
        if (!this.container) {
            this.container = new Container();
            this.registerProviders();
        }

        return this.container;
    };
}
