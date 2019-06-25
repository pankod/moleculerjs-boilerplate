module.exports = {
	name: "planet",
	actions: {
    
		Defend: {
			handler(ctx) {
				return `Defend ${ctx.params.damage} attack!`;
			}
		}
	}
};
