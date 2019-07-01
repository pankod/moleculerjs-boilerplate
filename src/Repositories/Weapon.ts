// Global Imports

// Local Imports
import { Weapon } from '@Entities/Weapon';
import { getManager } from 'typeorm';
import { DecreaseAmmoOutDto } from '@Interfaces';
import { Throw404 } from './ErrorHelpers';

export namespace WeaponRepository {
	const getWeapon = async (weaponName: string): Promise<Weapon> => {
		const weapon = await getManager().findOne(Weapon, { name: weaponName });

		Throw404(weapon, `Weapon '${weaponName}' can't be found!`)

		return weapon
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
