import { PlanetSql, WeaponSql } from "@Interfaces";

export interface FireMethodOutDto {
  weapon: WeaponSql,
  planet: PlanetSql,
  message: string;
}