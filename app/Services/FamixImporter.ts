import { inject, injectable } from 'inversify';
import { Project } from 'ts-morph';
import { Logger } from 'winston';

@injectable()
export class FamixImporter {
    @inject('Logger')
    private readonly logger!: Logger;

    @inject('Project')
    private readonly project!: Project;

    public readonly import = (path: string): void => {
        this.logger.info(`Importing project at ${path}`);
        this.project.addSourceFilesAtPaths(`${path}/**/*.ts`);
    };

    public readonly getJsonModel = (): string => '[]';
}
