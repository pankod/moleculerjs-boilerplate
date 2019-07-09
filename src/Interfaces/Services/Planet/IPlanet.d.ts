export namespace IPlanet {
	export interface DefendInDto {
		planetName: string;
		weaponName: string;
	}

	export interface DefendOutDto {
		damage: number;
		planetMessage: string;
	}
}
