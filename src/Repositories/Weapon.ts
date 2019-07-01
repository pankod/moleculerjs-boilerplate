import { Planet } from '@Entities/Planet';
import { Weapon } from '@Entities/Weapon';
import { getManager } from 'typeorm';
import { DecreaseAmmoOutDto } from '@Interfaces';

export namespace WeaponRepository {
	const getWeapon = async (weaponName: string): Promise<Weapon> => {
		return getManager().findOne(Weapon, { name: weaponName });
	}

	export const Get = async (weaponName: string): Promise<Weapon> => {
		return await getWeapon(weaponName)
	};

	export const DecreaseAmmo = async (weaponName: string): Promise<DecreaseAmmoOutDto> => {
		const weapon = await getWeapon(weaponName)

		weapon.ammo = weapon.ammo - 1

		getManager().save(weapon)

		return { remainingAmmo: weapon.ammo }
	}
}
