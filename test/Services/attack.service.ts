module.exports = {
	name: "attack",
	actions: {
		Fire: {
			handler(ctx) {
				return `Attack with ${ctx.params}!`;
			}
		}
	}
};