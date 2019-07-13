//#region Global Imports
import { Errors } from 'moleculer';
//#endregion Global Imports

//#region Local Imports
import { Throw404 } from '@Repositories/ErrorHelpers';
//#endregion Local Imports

describe('Throw 404', () => {
	it('should be defined', () => {
		expect(Throw404).toBeDefined();
	});

	it('shouldnt throw error if resource is present', () => {
		expect(() => Throw404({ resource: 'test' }, 'Test Error')).not.toThrow();
	});

	it('should throw error when resource not present', () => {
		expect(() => Throw404(undefined, 'Test Error')).toThrowError(Errors.MoleculerError);
	});
});
