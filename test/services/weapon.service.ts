module.exports = {
	name: "weapon",
	actions: {
		Fire: {
			handler(ctx) {
				return `Attack with ${ctx.params.damage}!`;
			}
		}
	}
};
