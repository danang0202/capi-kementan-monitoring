import { Sampel } from './Sampel';
export interface WilayahKerja {
  id: string;
  name: string;
  districtId: string;
  createdAt: string;
  updatedAt: string;
  petugasId: number;
  sampel: Sampel[];
}
