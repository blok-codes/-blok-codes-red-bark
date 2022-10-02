import base, { IConfig } from 'config';

import { Level, levels, Settings as BaseSettings } from '../../config/Settings';

export interface Settings extends IConfig {
    getTyped: <T extends keyof BaseSettings>(setting: T) => BaseSettings[T];
}

const getTyped = <T extends keyof BaseSettings>(setting: T): BaseSettings[T] => base.get(setting);
const settings: Settings = { ...base, getTyped };

export { Level, levels, settings };
