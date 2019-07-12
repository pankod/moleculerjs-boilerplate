import { DummyContext } from './DummyContext';
import { Context } from 'moleculer';

describe('Dummy Context', async () => {
	it('should define getCall', async () => {
		const ctx = DummyContext.getCall({});

		expect(ctx).toBeInstanceOf(Context);
		expect(ctx.call).toBeDefined();
		expect(await ctx.call('test', {})).toEqual({});
	});
});
