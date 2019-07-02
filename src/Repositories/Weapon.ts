//#region Global Imports
import { getManager } from 'typeorm';
//#endregion Global Imports

//#region Local Imports
import { Weapon } from '@Entities/Weapon';
import { getResource } from './Shared';
//#endregion Local Imports

//#region Interfaces Imports
import { DecreaseAmmoOutDto } from '@Interfaces';
//#endregion Interfaces Imports

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
