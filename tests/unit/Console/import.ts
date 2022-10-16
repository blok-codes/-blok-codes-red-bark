import { FamixRepository } from '@blok-codes/famix/dist/FamixRepository';
import fs from 'fs-extra';
import { Container, injectable } from 'inversify';
import 'reflect-metadata';
import { Logger } from 'winston';

import Import from '../../../app/Console/import';
import { RedTwig } from '../../../app/Services/RedTwig';

@injectable()
class TestImportCommand extends Import {
    public argv: string[];
    public static args = Import.args;
}

let command: Import;
let container: Container;

const importer = {
    import: jest.fn((message: string) => void 0),
};

const logger = {
    info: jest.fn((message: string) => void 0),
};

const repository = {
    toJSON: jest.fn((message: string) => '[]'),
};

jest.mock('fs-extra', () => ({
    outputFile: jest.fn(async (...args) => void 0),
}));

describe('import command', () => {
    beforeAll(() => {
        container = new Container();

        container.bind<RedTwig>('RedTwig').toConstantValue(importer as any);
        container.bind<FamixRepository>('FamixRepository').toConstantValue(repository as any);

        container.bind<Logger>('Logger').toConstantValue(logger as any);
        container.bind('TestImportCommand').to(TestImportCommand);

        command = container.get<Import>('TestImportCommand');
    });

    afterAll(() => {
        jest.restoreAllMocks();
    });

    it('should not run update command without args', async () => {
        await expect(command.run).rejects.toThrowErrorMatchingSnapshot();
    });

    it('should not run update command without required args', async () => {
        command.argv = ['project'];
        await expect(command.run).rejects.toThrowErrorMatchingSnapshot();
    });

    it('should not run update command with invalid flags', async () => {
        command.argv = ['project', '--invalid'];
        await expect(command.run).rejects.toThrowErrorMatchingSnapshot();
    });

    it('should run command to import project', async () => {
        command.argv = ['path/to/project', '--output', 'path/to/output', '--format', 'json'];
        await command.run();

        expect(fs.outputFile).toHaveBeenCalledWith('path/to/output/model.json', '[]', { encoding: 'utf8' });
        expect(logger.info).toHaveBeenCalledWith(`Generated the model output in json format to path/to/output`);
    });
});
