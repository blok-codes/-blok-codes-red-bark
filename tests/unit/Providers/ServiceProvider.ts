import { Container } from 'inversify';
import 'reflect-metadata';
import { Project } from 'ts-morph';
import { ServiceProvider } from '../../../app/Providers/ServiceProvider';
import { buildLogger } from '../../../app/Utils/Logger';
import { settings } from '../../../app/Utils/Settings';

describe('ServiceProvider', () => {
    let container: Container;

    beforeAll(() => {
        container = new Container();
        container.load(ServiceProvider.register());

        // bind utilities
        container.bind('Settings').toConstantValue(settings);
        container.bind('Logger').toConstantValue(buildLogger(settings));
    });

    it('should register all services', () => {
        expect(container.isBound('Project')).toBeTruthy();
    });

    it('should register all services with correct types', () => {
        expect(container.get('Project')).toBeInstanceOf(Project);
    });
});
