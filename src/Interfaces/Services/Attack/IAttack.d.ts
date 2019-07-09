export namespace IAttack {
	export interface AttackInDto {
		planetName: string
		weaponName: string
	}

	export interface AttackOutDto {
		planetMessage: string
		weaponMessage: string
	}
}
