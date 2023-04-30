import { Area } from './area.model';
import { Squad } from './squad.model';

export interface Team {
  id: number;
  name: string;
  shortName: string;
  crest: string;
  tla: string;
  area: Area;
  address: string;
  website: string;
  founded: number;
  clubColors: string;
  runningCompetitions: string;
  coach: string;
  marketValue: string;
  squad: [Squad];
  lastUpdated: string;
}
