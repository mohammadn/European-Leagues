export interface Squad {
  id: number;
  firstName: string;
  lastName: string;
  name: string;
  position: string;
  dateOfBirth: string;
  nationality: string;
  shirtNumber: number;
  marketValue: number;
  contract: Contract;
}

export interface Contract {
  start: string;
  until: string;
}
