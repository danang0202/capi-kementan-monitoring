import { WilayahKerja } from './WilayahKerja';

export interface User {
  name: string;
  username: string;
  email: string;
  access_token: string;
  token_odk: string;
  wilayah_kerja: WilayahKerja[];
  role: string;
}
