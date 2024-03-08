export interface IUserEvent {
  id: string;
  age: number;
}

export interface IRecord {
  name: string;
  dob: Date;
  gender: number;
  setting: any;
  events: IUserEvent[];
}
export interface ICreateOrUpdateMapInputDto {
  id?: string;
  clientName: string;
  numsOfMember: number;
  objectTitle: string;
  creatorName: string;
  creationTime: Date;
  records: IRecord[];
}
