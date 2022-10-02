import { ContainerModule } from 'inversify';

export abstract class Provider {
    public static readonly register = (): ContainerModule => {
        throw new Error('register function must be implemented');
    };
}
