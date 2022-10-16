import { FamixRepository } from '@blok-codes/famix/dist/FamixRepository';
import { Command, command } from '@blok-codes/inversify-oclif-utils';
import { Flags, Interfaces } from '@oclif/core';
import fs from 'fs-extra';
import { inject } from 'inversify';
import { Logger } from 'winston';

import { RedTwig } from '../Services/RedTwig';

const availableFormats = ['json'];
type Format = typeof availableFormats[number];

@command('import')
export default class Import extends Command {
    @inject('RedTwig')
    private readonly importer!: RedTwig;

    @inject('FamixRepository')
    private readonly repository!: FamixRepository;

    @inject('Logger')
    private readonly logger!: Logger;

    static description = 'Import typescript project to generate a model';

    public static readonly flags: Interfaces.FlagInput<Record<string, unknown>> = {
        format: Flags.string({
            char: 'f',
            default: 'json',
            description: 'Format of the output',
            options: availableFormats,
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
            await this.output(flags.output as string, this.repository.toJSON(), flags.format as Format);
        }
    };

    private readonly output = async (path: string, model: string, format: Format): Promise<void> => {
        await fs.outputFile(`${path}/model.${format}`, model, { encoding: 'utf8' });
        this.logger.info(`Generated the model output in ${format} format to ${path}`);
    };
}
