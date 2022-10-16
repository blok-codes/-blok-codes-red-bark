import { Method } from '@blok-codes/famix/dist/FamixTypeScript/Method';
import path from 'path';

import { kernel } from '../../app/Kernel';
import { FamixRepository } from '../../app/Services/FamixRepository';
import { RedTwig } from '../../app/Services/RedTwig';

describe.skip('access', () => {
    const fixture = path.resolve(__dirname, '../fixtures/Access.ts');

    const importer = kernel.get<RedTwig>('RedTwig');
    const repository = kernel.get<FamixRepository>('FamixRepository');

    let parsedModel: Record<string, any>[];

    beforeAll(() => {
        importer.import([fixture]);
        parsedModel = JSON.parse(repository.toJSON());
    });

    it('should have a class with two methods and two attributes', () => {
        const attributes = ['privateAttribute', 'publicAttribute'];
        const methods = ['privateMethod', 'returnAccessName'];

        const clazz = parsedModel.find((el) => el.FM3 == 'FamixTypeScript.Class' && el.name == 'AccessClassForTesting');

        expect(clazz.attributes.length).toEqual(attributes.length);
        expect(clazz.methods.length).toEqual(methods.length);

        const clazzMethods = parsedModel.filter((e) => clazz.methods.some((m) => m.ref == e.id));
        const clazzAttributes = parsedModel.filter((e) => clazz.attributes.some((a) => a.ref == e.id));

        expect(clazzMethods.length).toBeGreaterThan(0);
        expect(clazzAttributes.length).toBeGreaterThan(0);

        expect(clazzMethods.every((m) => methods.includes(m.name))).toBe(true);
        expect(clazzAttributes.every((a) => attributes.includes(a.name))).toBe(true);
    });

    it('should have an access to privateAttribute in privateMethod', () => {
        const famixAccess = parsedModel.find(
            (el) =>
                el.FM3 == 'FamixTypeScript.Access' &&
                (repository.getFamixElementById(el.accessor.ref) as Method).name == 'privateMethod' &&
                (repository.getFamixElementById(el.variable.ref) as any).name == 'privateAttribute'
        );

        expect(famixAccess).toBeTruthy();
    });

    it('should have an access to privateAttribute in returnAccessName', () => {
        const famixAccess = parsedModel.find(
            (el) =>
                el.FM3 == 'FamixTypeScript.Access' &&
                (repository.getFamixElementById(el.accessor.ref) as Method).name == 'returnAccessName' &&
                (repository.getFamixElementById(el.variable.ref) as any).name == 'privateAttribute'
        );

        expect(famixAccess).toBeTruthy();
    });
});
