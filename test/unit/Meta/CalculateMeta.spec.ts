import { CalculateMeta } from '../../../src/Meta/CalculateMeta';

describe('Test CalculateMeta constructor', () => {
	it('should create an empty options', () => {
		expect(CalculateMeta).toBeDefined();
	});
});

describe('Test CalculateMeta functions', () => {
	it('should calculate shield', async () => {
		const params = {
            damage: 1000
        };

		const result = await CalculateMeta.Damage(params.damage);

		expect(result).toEqual(9000);
	});
});
