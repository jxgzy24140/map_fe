import { IRecord } from "@/services/maps/dto";

export interface IMapDto {
  id?: string;
  clientName: string;
  numsOfMember: number;
  objectTitle: string;
  creatorName: string;
  creationTime: Date;
  records: IRecord[];
}
