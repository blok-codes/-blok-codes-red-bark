import { App } from './App';
import { kernel } from './Kernel';

const app = new App(kernel);

app.start();

export { run } from '@oclif/core';
