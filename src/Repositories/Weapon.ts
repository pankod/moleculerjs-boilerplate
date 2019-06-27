import { Planet } from '@Entities/Planet';
import { Weapon } from '@Entities/Weapon';
import { getManager } from 'typeorm';

const getWeapon = async (weaponName): Promise<Weapon> => {
	const entityManager = getManager();

	const weapon = await entityManager.findOne(Weapon, { name: weaponName });

	return weapon;
}

export namespace WeaponRepository {
	export const Get = async (weaponName: string): Promise<Weapon> => {
		return await getWeapon(weaponName)
	};

	export const Fire = async (weaponName: string): Promise<{ remainingAmmo: number }> => {
		const weapon = await getWeapon(weaponName)

		weapon.ammo = weapon.ammo - 100

		getManager().save(weapon)

		return { remainingAmmo: weapon.ammo }
	}
}
