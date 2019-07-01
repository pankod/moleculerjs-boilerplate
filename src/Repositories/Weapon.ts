// Global Imports

// Local Imports
import { Weapon } from '@Entities/Weapon';
import { getManager } from 'typeorm';
import { DecreaseAmmoOutDto } from '@Interfaces';
import { Throw404 } from './ErrorHelpers';
import { getResource } from './Shared';

export namespace WeaponRepository {
	export const Get = async (weaponName: string): Promise<Weapon> => {
		return await getResource(Weapon, { name: weaponName });
	};

	export const DecreaseAmmo = async (weaponName: string): Promise<DecreaseAmmoOutDto> => {
		const weapon = await getResource(Weapon, { name: weaponName });

		weapon.ammo = weapon.ammo - 1;

		getManager().save(weapon);

		return { remainingAmmo: weapon.ammo };
	};
}
