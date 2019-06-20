// Global Imports
import { Context, Endpoint, ServiceBroker } from 'moleculer';

export module DummyContext {

	const broker = new ServiceBroker({ logger: false, maxCallLevel: 5 });

	const endpoint: Endpoint = {
		broker,
		id: 'server-123',
		node: {},
		local: true,
		state: false
	};

	export const getCall = (data: object = {}) => {
		let ctx = Context.create(broker, endpoint, data);
		ctx.call = jest.fn(() => (broker.Promise as any).resolve({}));

		return ctx;
	};

}
