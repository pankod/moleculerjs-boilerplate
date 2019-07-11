//#region Global Imports
import { ServiceBroker } from 'moleculer';
//#endregion Global Imports

//#region Local Imports
/* eslint-disable */
const AttackService = require('../../services/attack.service');
const PlanetService = require('../../services/planet.service');
/* eslint-enable */
//#endregion Local Imports

export namespace BrokerHelper {
	export const setupBroker = () => {
		const broker = new ServiceBroker({ logger: false });

		broker.createService(AttackService);
		broker.createService(PlanetService);

		return broker;
	};
}
