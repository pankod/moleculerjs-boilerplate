//#region Global Imports
import { Context, Endpoint, ServiceBroker } from 'moleculer';
//#endregion Global Imports

export namespace DummyContext {
	const broker = new ServiceBroker({ logger: false, maxCallLevel: 5 });

	const endpoint: Endpoint = {
		broker,
		id: 'server-123',
		node: {},
		local: true,
		state: false,
	};

	export const getCall = <T>(data: T): Context => {
		const ctx = Context.create(broker, endpoint, data);
		// eslint-disable-next-line
		ctx.call = jest.fn(async () => (broker.Promise as any).resolve({}));

		return ctx;
	};
}
