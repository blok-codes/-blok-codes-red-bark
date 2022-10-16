import path from 'path';

import { kernel } from '../../app/Kernel';
import { FamixRepository } from '../../app/Services/FamixRepository';
import { RedTwig } from '../../app/Services/RedTwig';

describe('abstract classes and methods', () => {
    const fixture = path.resolve(__dirname, '../fixtures/Abstracts.ts');

    const importer = kernel.get<RedTwig>('RedTwig');
    const repository = kernel.get<FamixRepository>('FamixRepository');

    beforeAll(() => {
        importer.import([fixture]);
    });

    it('should contain an abstract class', () => {
        const clazz = repository.getFamixClass('MyAbstractClass');

        expect(clazz).toBeTruthy();
        expect(clazz.isAbstract).toBe(true);
    });

    it('should contain all the abstract methods', () => {
        const clazz = repository.getFamixClass('MyAbstractClass');
        const methods = Array.from(clazz.methods.values());

        expect(methods).toHaveLength(3);
        expect(methods.filter((method: any) => method.isAbstract)).toHaveLength(2);
        expect(methods.filter((method: any) => !method.isAbstract)).toHaveLength(1);
    });
});
