import 'reflect-metadata';

import { useContainer } from '@blok-codes/inversify-oclif-utils';

import { Registry } from './Registry';

const kernel = Registry.getContainer();
useContainer(kernel);

export { kernel };
