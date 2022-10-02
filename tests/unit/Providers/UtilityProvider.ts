import { Container } from 'inversify';
import 'reflect-metadata';
import { Logger } from 'winston';
import { isTypeOf } from '../../../app/Helpers';
import { UtilityProvider } from '../../../app/Providers/UtilityProvider';
import { ProcessHandler } from '../../../app/Utils/ProcessHandler';
import { Settings } from '../../../config/Settings';

describe('UtilityProvider', () => {
    let container: Container;

    beforeAll(() => {
        container = new Container();
        container.load(UtilityProvider.register());
    });

    it('should register all services', () => {
        expect(container.isBound('Settings')).toBeTruthy();
        expect(container.isBound('Logger')).toBeTruthy();
        expect(container.isBound('ProcessHandler')).toBeTruthy();
    });

    it('should register all services with correct types', () => {
        expect(isTypeOf<Settings>(container.get('Settings'))).toBeTruthy();
        expect(isTypeOf<Logger>(container.get('Logger'))).toBeTruthy();
        expect(container.get('ProcessHandler')).toBeInstanceOf(ProcessHandler);
    });
});
