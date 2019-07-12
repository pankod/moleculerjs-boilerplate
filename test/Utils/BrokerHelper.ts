//#region Global Imports
import { ServiceBroker } from 'moleculer';
//#endregion Global Imports

/* eslint-disable */
//#region Local Imports
const AttackService = require('../../services/attack.service');
const PlanetService = require('../../services/planet.service');
//#endregion Local Imports
/* eslint-enable */

export namespace BrokerHelper {
	export const setupBroker = () => {
		const broker = new ServiceBroker({ logger: false });

		broker.createService(AttackService);
		broker.createService(PlanetService);

		return broker;
	};
}
