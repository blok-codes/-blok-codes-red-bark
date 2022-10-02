import { levels, settings } from '../../../app/Utils/Settings';

describe('Settings', () => {
    it('should be defined', () => {
        expect(settings).toBeDefined();
        expect(settings.getTyped).toBeDefined();
        expect(Object.values(levels)).toHaveLength(8);
    });
});
