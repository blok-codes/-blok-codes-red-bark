import { PartialDeep } from 'type-fest';
import { Settings } from './Settings';

const config: PartialDeep<Settings> = {
    app: {
        name: 'test',
    },
};

export = config;
