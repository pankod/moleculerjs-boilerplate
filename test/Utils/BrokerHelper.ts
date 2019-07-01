import { ServiceBroker } from 'moleculer'

const AttackService = require("../../services/attack.service")
const PlanetService = require("../../services/planet.service")

export namespace BrokerHelper {
  export const setupBroker = () => {
    const broker = new ServiceBroker({ logger: false })

    broker.createService(AttackService)
    broker.createService(PlanetService)

    return broker
  }
}