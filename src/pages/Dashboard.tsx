import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import { GetTanggalIndonesia } from '../utils/getTanggalIndonesia';
import { convertToIndonesianDate } from '../utils/convertDate';
import { calculateRemainingTime } from '../utils/calculateRemainingTime';
import { Period } from '../data/period';
import { FaClipboardList, FaCheckCircle, FaArchive, FaWindowClose, FaCheckDouble } from 'react-icons/fa';
import { IoIosTimer } from 'react-icons/io';
import { IoClose, IoTimeOutline } from 'react-icons/io5';
import { FaPeopleGroup } from 'react-icons/fa6';
import { MdReportProblem, MdSend, MdEditDocument } from 'react-icons/md';
import { Progress } from '../data/progress';
import ProgressBar from '../components/ProgressBar';
import 'aos/dist/aos.css';
import DoughnutChart from '../components/DoughnutChart';

const Dashboard: React.FC = () => {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-gray-500 text-sm">Dashboard</p>
      {/* Greetings */}
      <p className="font-extrabold text-2xl">Selamat datang !</p>
      {/* Waktu */}
      <div className="shadow p-4 bg-white rounded-md">
        <div className="box-content py-2 md:flex block max-md:space-y-2 justify-between text-sm">
          <div className="card-compact flex gap-2 items-center">
            <div className="flex gap-2 items-center">
              <IoIosTimer className="text-primary text-2xl md:text-4xl" />
              <h2 className="font-semibold">Waktu Mulai : </h2>
            </div>
            <p>{convertToIndonesianDate(Period.start)}</p>
          </div>
          <div className=" card-compact flex gap-2 items-center">
            <div className="flex gap-2 items-center">
              <IoTimeOutline className="text-primary text-2xl md:text-4xl" />
              <h2 className="font-semibold">Waktu Selesai : </h2>
            </div>
            <p>{convertToIndonesianDate(Period.end)}</p>
          </div>
        </div>

        <hr className="w-full border-t-[1.7px] border-slate-300" />

        <div className="card py-4 md:flex md:flex-row justify-between items-center max-md:space-y-2">
          <h1 className="">{GetTanggalIndonesia()}</h1>
          {new Date() < Period.start && <Button variant="primary" label="Periode Survei Belum Dimulai" />}
          {new Date() >= Period.start && new Date() <= Period.end && (
            <p className="text-primary font-semibold">Tersisa {`${calculateRemainingTime(Period.end).days.toString()} hari ${calculateRemainingTime(Period.end).hours.toString()} jam`} </p>
          )}
          {new Date() > Period.end && <Button label="Periode Survei Telah Selesai" variant="primary" />}
        </div>
      </div>

      {/* Jumlah petugas sampel */}
      <div className="box-content py-2 md:grid md:grid-cols-2 gap-4 max-md:space-y-2 ">
        <div className=" shadow p-4 card-compact flex gap-2  items-center bg-white rounded-md ">
          <FaClipboardList className="text-primary text-2xl md:text-4xl" />
          <div className="">
            <h2 className="font-semibold">Jumlah Sampel</h2>
            <p>45 Orang</p>
          </div>
        </div>
        <div className=" shadow p-4 card-compact flex gap-2 items-center bg-white rounded-md ">
          <FaPeopleGroup className="text-primary text-2xl md:text-4xl" />
          <div className="">
            <h2 className="font-semibold">Jumlah Petugas</h2>
            <p>20 Orang</p>
          </div>
        </div>
      </div>

      {/* Ringkasan Hasil Cacah */}
      <div className="box-content py-2 grid md:grid-cols-4 grid-cols-2 gap-2 md:gap-4 ">
        <div className=" shadow p-4 py-8 card-compact md:flex gap-2 items-center bg-white rounded-md ">
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
          <div className=" shadow p-4 py-4 card-compact flex gap-2 items-center bg-white rounded-md ">
            <MdSend className="text-info text-3xl" />
            <h2 className="">Diterima</h2>
            <p className=" text-info font-semibold badge badge-ghost">14</p>
          </div>
          <div className=" shadow p-4 py-4 card-compact flex gap-2 items-center bg-white rounded-md ">
            <MdEditDocument className="text-warning text-3xl" />
            <h2 className="">Diubah</h2>
            <p className=" text-warning font-semibold badge badge-ghost">1</p>
          </div>
        </div>
        <div className="grid grid-flow-row gap-2">
          <div className=" shadow p-4 py-4 card-compact flex gap-2 items-center bg-white rounded-md ">
            <MdReportProblem className="text-orange-600 text-3xl" />
            <h2 className="">Bermasalah</h2>
            <p className=" text-orange-600 font-semibold badge badge-ghost">0</p>
          </div>
          <div className=" shadow p-4 py-4 card-compact flex gap-2 items-center bg-white rounded-md ">
            <FaWindowClose className="text-error text-3xl" />
            <h2 className="">Ditolak</h2>
            <p className=" text-error font-semibold badge badge-ghost">0</p>
          </div>
        </div>
        <div className="shadow p-4 py-8 card-compact md:flex gap-2 items-center bg-white rounded-md ">
          <FaCheckCircle className="text-success text-6xl mx-auto" />
          <div className="md:w-3/5 flex justify-center">
            <div className="text-center">
              <h2 className="font-semibold">Total Approved</h2>
              <p className="text-3xl text-success font-semibold">14</p>
              <p className="">Approved</p>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Pencacahan */}
      <div className="p-4 space-y-2 rounded-md bg-white shadow">
        <h1 className="font-semibold text-xl ">Progress Pencacahan </h1>
        <hr className="w-full border-t-[1.7px] border-slate-300" />
        <div className="md:flex my-4 space-y-4 md:space-y-0 md:space-x-2">
          <div className="md:w-1/2 w-full flex justify-center items-start">
            <div className="w-full space-y-4">
              <h2 className="font-semibold text-lg my-2 text">Progress Keseluruhan</h2>
              <DoughnutChart dataCacah={35} dataBelumCacah={65} />
              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-center justify-start btn btn-outline text-primary">
                  <FaCheckDouble /> Tercacah : 35 sampel
                </div>
                <div className="flex items-center justify-start btn btn-outline text-gray-500">
                  <IoClose /> Belum Tercacah : 65 sampel
                </div>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 w-full">
            <h2 className="font-semibold text-lg my-2">Detail Progress Per Petugas</h2>
            <div className="block space-y-6">
              {Progress.slice(0, 3).map((item) => (
                <div className="block shadow p-4">
                  <h2 className="font-semibold text-lg text-slate-700">{item.name}</h2>
                  <ProgressBar key={item.id} max={item.max} value={item.value} label={true} percentage={true} />
                </div>
              ))}
            </div>
            <div className="w-full flex justify-end">
              <Link to={'/progress'} className="my-4 btn  btn-primary">
                Lihat Progress Petugas Lainnya
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
