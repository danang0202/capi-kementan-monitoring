import React, { useEffect } from 'react';
import Button from '../components/Button';
import { GetTanggalIndonesia } from '../utils/getTanggalIndonesia';
import { convertToIndonesianDate } from '../utils/convertDate';
import { calculateRemainingTime } from '../utils/calculateRemainingTime';
import { Period } from '../data/period';
import { FaClipboardList, FaCheckCircle, FaArchive, FaWindowClose } from 'react-icons/fa';
import { IoIosTimer } from 'react-icons/io';
import { IoTimeOutline } from 'react-icons/io5';
import { FaPeopleGroup } from 'react-icons/fa6';
import { MdReportProblem, MdSend, MdEditDocument } from 'react-icons/md';
import { User } from '../data/user';
import { Progress } from '../data/Progress';
import ProgressBar from '../components/ProgressBar';
import 'aos/dist/aos.css';
import AOS from 'aos';

const Dashboard: React.FC = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true }); // Durasi animasi dalam milidetik
  }, []);
  return (
    <div className="p-4">
      <div className="card py-4" data-aos="fade-left">
        <h1 className="font-semibold text-2xl">Selamat Datang {User.name}</h1>
        <p>Halaman Dashboard Web Monitoring Patanas Awwwwyeahhh</p>
      </div>
      <div className="box-content py-2 grid md:grid-cols-4 grid-cols-2 gap-4 " data-aos="fade-left">
        <div className=" shadow-md p-4 py-8 card-compact md:flex gap-2 items-center bg-white rounded-md ">
          <FaArchive className="text-info text-6xl mx-auto" />
          <div className="md:w-3/5 flex justify-center">
            <div className="text-center">
              <h2 className="font-semibold">Total Submissions</h2>
              <p className="text-3xl text-info font-semibold">20</p>
              <p className="">Terkumpul</p>
            </div>
          </div>
        </div>
        <div className="grid grid-flow-row gap-2">
          <div className=" shadow-md p-4 py-4 card-compact flex gap-2 items-center bg-white rounded-md ">
            <MdSend className="text-info text-3xl" />
            <h2 className="">Diterima</h2>
            <p className=" text-info font-semibold badge badge-ghost">14</p>
          </div>
          <div className=" shadow-md p-4 py-4 card-compact flex gap-2 items-center bg-white rounded-md ">
            <MdEditDocument className="text-warning text-3xl" />
            <h2 className="">Diubah</h2>
            <p className=" text-warning font-semibold badge badge-ghost">1</p>
          </div>
        </div>
        <div className="grid grid-flow-row gap-2">
          <div className=" shadow-md p-4 py-4 card-compact flex gap-2 items-center bg-white rounded-md ">
            <MdReportProblem className="text-warning text-3xl" />
            <h2 className="">Bermasalah</h2>
            <p className=" text-warning font-semibold badge badge-ghost">0</p>
          </div>
          <div className=" shadow-md p-4 py-4 card-compact flex gap-2 items-center bg-white rounded-md ">
            <FaWindowClose className="text-error text-3xl" />
            <h2 className="">Ditolak</h2>
            <p className=" text-error font-semibold badge badge-ghost">0</p>
          </div>
        </div>
        <div className=" shadow-md p-4 py-8 card-compact flex gap-2 items-center bg-white rounded-md ">
          <FaCheckCircle className="text-success text-6xl" />
          <div className="w-3/5 flex justify-center">
            <div className="text-center">
              <h2 className="font-semibold">Total Approved</h2>
              <p className="text-3xl text-success font-semibold">14</p>
              <p className="">Approved</p>
            </div>
          </div>
        </div>
      </div>
      <div className="shadow-md p-4  bg-white rounded-md" data-aos="fade-left">
        <div className="box-content py-2 md:flex block max-md:space-y-2 justify-between">
          <div className="card-compact flex gap-2 items-center">
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
          {new Date() >= Period.start && new Date() <= Period.end && (
            <p className="text-primary font-semibold">Tersisa {`${calculateRemainingTime(Period.end).days.toString()} hari ${calculateRemainingTime(Period.end).hours.toString()} jam`} </p>
          )}
          {new Date() > Period.end && <Button label="Periode Survei Telah Selesai" variant="primary" />}
        </div>
      </div>

      <div className="box-content py-2 grid grid-cols-2 gap-4 " data-aos="fade-right">
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
            <p>20 Orang</p>
          </div>
        </div>
      </div>
      <div className="p-4 space-y-2 rounded-md bg-white shadow-md" data-aos="fade-right">
        <h1 className="font-semibold text-xl ">Progress Pencacahan </h1>
        <hr className="w-full border-t-[1.7px] border-slate-300" />
        <ProgressBar max={100} value={35} label={true} percentage={true} />
        {/* <Button label="Lihat Detail" variant="primary" /> */}
      </div>

      <div className="p-4 space-y-2 rounded-md bg-white my-4 shadow-md" data-aos="fade-up">
        <h1 className="font-semibold text-xl ">Progress Pencacahan Per Petugas</h1>
        <hr className="w-full border-t-[1.7px] border-slate-300" />

        <div className="grid md:grid-cols-3 grid-cols-1 gap-2">
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
