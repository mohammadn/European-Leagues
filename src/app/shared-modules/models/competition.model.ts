import { Area } from "./area.model";
import { Season } from "./season.model";

export interface Competition {
  area: Area;
  id: number;
  name: string;
  code: string;
  type: string;
  emblem: string;
  lastUpdated: string;
  currentSeason: Season;
  seasons: [Season];
}
