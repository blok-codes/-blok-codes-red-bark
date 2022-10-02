import { Command, command } from '@blok-codes/inversify-oclif-utils';
import { Flags, Interfaces } from '@oclif/core';
import fs from 'fs-extra';
import { inject } from 'inversify';
import { Logger } from 'winston';

import { FamixImporter } from '../Services/FamixImporter';

@command('import')
export default class Import extends Command {
    @inject('FamixImporter')
    private readonly importer!: FamixImporter;

    @inject('Logger')
    private readonly logger!: Logger;

    static description = 'Import typescript project to generate a model';

    public static readonly flags: Interfaces.FlagInput<Record<string, unknown>> = {
        format: Flags.string({
            char: 'f',
            default: 'json',
            description: 'Format of the output',
            options: ['json'],
            required: false,
        }),
        output: Flags.string({
            char: 'o',
            description: 'Path to generate the model output file',
            required: true,
        }),
    };

    public static readonly args: Interfaces.ArgInput = [
        {
            description: 'Path to the typescript project',
            name: 'project',
            required: true,
        },
    ];

    public readonly run = async (): Promise<void> => {
        const { args, flags } = await this.parse(Import);

        if (args.project && flags.format === 'json') {
            this.importer.import(args.project);

            const model = this.importer.getJsonModel();
            const file = `${flags.output as string}/model.json`;

            await fs.outputFile(file, model, { encoding: 'utf8' });
            this.logger.info(`Generated the model output in json from to ${flags.output as string}`);
        }
    };
}
