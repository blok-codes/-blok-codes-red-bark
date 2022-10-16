import { ContainerModule, decorate, injectable, interfaces } from 'inversify';
import { Project } from 'ts-morph';

import { FamixRepository } from '../Services/FamixRepository';
import { RedTwig } from '../Services/RedTwig';
import { Provider } from './Provider';

decorate(injectable(), Project);

export class ServiceProvider extends Provider {
    public static readonly register = (): ContainerModule =>
        new ContainerModule((bind) => {
            this.registerProject(bind);
            this.registerFamixImporter(bind);
            this.registerFamixRepository(bind);
        });

    private static readonly registerProject = (bind: interfaces.Bind) =>
        bind<Project>('Project').toConstantValue(new Project());

    private static readonly registerFamixImporter = (bind: interfaces.Bind) =>
        bind<RedTwig>('RedTwig').to(RedTwig).inSingletonScope();

    private static readonly registerFamixRepository = (bind: interfaces.Bind) =>
        bind<FamixRepository>('FamixRepository').to(FamixRepository).inSingletonScope();
}
