import * as fs from 'fs';
import * as path from 'path';

export module CalculateMeta {
	const db = JSON.parse(fs.readFileSync(path.resolve('src/', 'db.json'), 'utf8'));

	export const Damage = (damage: number): number => {

		const currentAmmo = db.DEATHSTAR.ammo;
		const currentShield = db.PLANET.shield;

		db.DEATHSTAR.ammo = currentAmmo - damage;
		db.PLANET.shield = currentShield - damage;

		fs.writeFile(path.resolve('src/', 'db.json'), JSON.stringify(db, null, 4), (err) => {
			if (err) return console.log(err);
		});

		return db.PLANET.shield;
	};

	export const getDeathStarAttack = () => {

		const data = {
			ammo: db.DEATHSTAR.ammo,
			damage: db.DEATHSTAR.attacks[0].damage,
			shield: db.PLANET.shield
		};

		return data;
	};

}
