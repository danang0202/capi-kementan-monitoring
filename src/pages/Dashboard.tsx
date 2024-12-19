import React from 'react';
import Button from '../components/Button';
import { GetTanggalIndonesia } from '../utils/getDay';
import { convertToIndonesianDate } from '../utils/convertDate';
import { Period } from '../data/period';
import { FaClipboardList } from 'react-icons/fa';
import { IoIosTimer } from 'react-icons/io';
import { IoTimeOutline } from 'react-icons/io5';
import { FaPeopleGroup } from 'react-icons/fa6';
import { User } from '../data/user';
import { Progress } from '../data/Progress';
import ProgressBar from '../components/ProgressBar';

const Dashboard: React.FC = () => {
  return (
    <div className="p-4">
      <div className="card py-4">
        <h1 className="font-semibold text-2xl">Selamat Datang {User.name}</h1>
        <p>Halaman Dashboard Web Monitoring Patanas Awwwwyeahhh</p>
      </div>
      <div className="shadow-md p-4  bg-white rounded-md">
        <div className="box-content py-2 flex justify-between">
          <div className="   card-compact flex gap-2 items-center">
            <IoIosTimer className="text-primary text-4xl" />
            <h2 className="font-semibold">Waktu Mulai</h2>
            <p>{convertToIndonesianDate(Period.start)}</p>
          </div>
          <div className=" card-compact flex gap-2 items-center">
            <IoTimeOutline className="text-primary text-4xl" />
            <h2 className="font-semibold">Waktu Selesai</h2>
            <p>{convertToIndonesianDate(Period.end)}</p>
          </div>
        </div>

        <hr className="w-full border-t-[1.7px] border-slate-300" />

        <div className="card py-4 flex flex-row justify-between items-center ">
          <h1 className="font-semibold text-">{GetTanggalIndonesia()}</h1>
          {new Date() < Period.start && <Button variant="primary" label="Periode Survei Belum Dimulai" />}
          {new Date() >= Period.start && new Date() <= Period.end && <Button variant="primary" label="Periode Survei Sedang Berlangsung" />}
          {new Date() > Period.start && <Button label="Periode Survei Telah Selesai" variant="primary" />}
        </div>
      </div>

      <div className="box-content py-2 grid grid-cols-2 gap-4 ">
        <div className=" shadow-md p-4 card-compact flex gap-2  items-center bg-white rounded-md ">
          <FaClipboardList className="text-primary text-4xl" />
          <div className="">
            <h2 className="font-semibold">Jumlah Sampel</h2>
            <p>45 Orang</p>
          </div>
        </div>
        <div className=" shadow-md p-4 card-compact flex gap-2 items-center bg-white rounded-md ">
          <FaPeopleGroup className="text-primary text-4xl" />
          <div className="">
            <h2 className="font-semibold">Jumlah Petugas</h2>
            <p>45 Orang</p>
          </div>
        </div>
      </div>
      <div className="p-4 space-y-2 rounded-md bg-white shadow-md">
        <h1 className="font-semibold text-xl ">Progress Pencacahan </h1>
        <hr className="w-full border-t-[1.7px] border-slate-300" />
        <ProgressBar max={100} value={35} label={true} percentage={true} />
        <Button label="Lihat Detail" variant="primary" />
      </div>

      <div className="p-4 space-y-2 rounded-md bg-white my-4 shadow-md">
        <h1 className="font-semibold text-xl ">Progress Pencacahan Per Petugas</h1>
        <hr className="w-full border-t-[1.7px] border-slate-300" />

        <div className="grid grid-cols-3 gap-2">
          {Progress.slice(0, 3).map((item) => (
            <div className="block shadow-md p-4">
              <h2 className="font-semibold text-lg">{item.data.name}</h2>
              <ProgressBar key={item.id} max={item.data.max} value={item.data.value} label={true} percentage={true} />
            </div>
          ))}
        </div>
        <Button label="Lihat Progress Petugas Lainnya" variant="primary" />
      </div>
    </div>
  );
};

export default Dashboard;
