import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import { GetTanggalIndonesia } from '../utils/getTanggalIndonesia';
import { convertToIndonesianDate } from '../utils/convertDate';
import { calculateRemainingTime } from '../utils/calculateRemainingTime';
import { Period } from '../data/period';
import { FaClipboardList, FaCheckDouble } from 'react-icons/fa';
import { IoIosTimer } from 'react-icons/io';
import { IoTimeOutline } from 'react-icons/io5';
import { Progress as ProgressPetugas } from '../data/progress';
import { Progress as ProgressWilayah } from '../data/progressWilayah';
import ProgressBar from '../components/ProgressBar';
import 'aos/dist/aos.css';
import DoughnutChart from '../components/DoughnutChart';
import { FaPeopleGroup } from 'react-icons/fa6';

/**
 * Modern Minimalist Dashboard (DaisyUI + Tailwind)
 * - Uses existing data & helper functions (Period, ProgressPetugas, ProgressWilayah, etc.)
 * - Single-file replacement for previous Dashboard
 * - Responsive, clean cards, thin progress bars, modern tabs
 */

const Dashboard: React.FC = () => {
  // --- compute lowest 3 petugas (by percentage) ---
  const lowestThreePetugas = [...ProgressPetugas]
    .map((item: any) => ({
      ...item,
      percentage: item.max > 0 ? item.value / item.max : 0,
    }))
    .sort((a: any, b: any) => a.percentage - b.percentage)
    .slice(0, 3);

  // --- aggregate wilayah by provinsi then lowest 3 ---
  const aggregatedByProvinsi = Object.values(
    ProgressWilayah.reduce((acc: Record<string, { provinsi: string; totalValue: number; totalMax: number }>, item: any) => {
      if (!acc[item.provinsi]) {
        acc[item.provinsi] = { provinsi: item.provinsi, totalValue: 0, totalMax: 0 };
      }
      acc[item.provinsi].totalValue += item.value;
      acc[item.provinsi].totalMax += item.max;
      return acc;
    }, {})
  );

  const lowestThreeProvinsi = aggregatedByProvinsi
    .map((p: any) => ({ ...p, percentage: p.totalMax > 0 ? p.totalValue / p.totalMax : 0 }))
    .sort((a: any, b: any) => a.percentage - b.percentage)
    .slice(0, 3);

  const [activeTab, setActiveTab] = useState<'petugas' | 'wilayah'>('petugas');

  // remaining time convenience
  const remaining = calculateRemainingTime(Period.end);

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <p className="text-sm text-slate-500">Dashboard</p>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800">Selamat datang!</h1>
          <p className="mt-1 text-sm text-slate-500">Ringkasan pencacahan dan performa</p>
        </div>

        <div className="flex gap-3 items-center">
          <div className="bg-white border border-slate-100 rounded-lg p-3 shadow-sm flex items-center gap-3">
            <IoIosTimer className="text-primary text-2xl" />
            <div>
              <div className="text-xs text-slate-500">Waktu Mulai</div>
              <div className="text-sm font-medium">{convertToIndonesianDate(Period.start)}</div>
            </div>
          </div>

          <div className="bg-white border border-slate-100 rounded-lg p-3 shadow-sm flex items-center gap-3">
            <IoTimeOutline className="text-primary text-2xl" />
            <div>
              <div className="text-xs text-slate-500">Waktu Selesai</div>
              <div className="text-sm font-medium">{convertToIndonesianDate(Period.end)}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Date & period status */}
      <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <div className="text-sm text-slate-500">Hari ini</div>
          <div className="text-base font-medium text-slate-700">{GetTanggalIndonesia()}</div>
        </div>

        <div className="flex items-center gap-3">
          {new Date() < Period.start && <Button variant="primary" label="Periode Survei Belum Dimulai" />}

          {new Date() >= Period.start && new Date() <= Period.end && (
            <div className="rounded-md px-3 py-2 bg-slate-50 border border-slate-100 text-slate-700 text-sm font-medium">
              <span className="text-primary font-semibold">Tersisa</span> <span className="ml-1">{`${remaining.days} hari ${remaining.hours} jam`}</span>
            </div>
          )}

          {new Date() > Period.end && <Button label="Periode Survei Telah Selesai" variant="primary" />}
        </div>
      </div>

      {/* Quick info cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm flex items-center gap-4">
          <div className="p-3 rounded-lg bg-gradient-to-tr from-primary/10 to-primary/5 text-primary">
            <FaClipboardList className="text-2xl" />
          </div>
          <div>
            <div className="text-xs text-slate-500">Jumlah Sampel</div>
            <div className="text-lg font-semibold text-slate-800">45 Orang</div>
          </div>
        </div>

        <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm flex items-center gap-4">
          <div className="p-3 rounded-lg bg-gradient-to-tr from-success/10 to-success/5 text-success">
            <FaPeopleGroup className="text-2xl" />
          </div>
          <div>
            <div className="text-xs text-slate-500">Jumlah Petugas</div>
            <div className="text-lg font-semibold text-slate-800">20 Orang</div>
          </div>
        </div>

        <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm flex items-center gap-4">
          <div className="p-3 rounded-lg bg-gradient-to-tr from-info/10 to-info/5 text-info">
            <FaCheckDouble className="text-2xl" />
          </div>
          <div>
            <div className="text-xs text-slate-500">Tercacah</div>
            <div className="text-lg font-semibold text-slate-800">35 Sampel</div>
          </div>
        </div>
      </div>

      {/* Progress Section */}
      <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-800">Progress Pencacahan</h2>
          <div className="text-sm text-slate-500">Overview dan detail per petugas / wilayah</div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Chart */}
          <div className="flex flex-col items-center gap-4">
            <div className="w-full bg-slate-50 border border-slate-100 rounded-xl p-4 flex flex-col items-center">
              <h3 className="text-sm text-slate-600 mb-2">Progress Keseluruhan</h3>
              <div className="w-48 h-48">
                <DoughnutChart dataCacah={35} dataBelumCacah={65} />
              </div>

              <div className="mt-4 w-full grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div className="flex items-center gap-2 p-2 rounded-md border border-slate-100 bg-white">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <div className="text-sm text-slate-700">Tercacah</div>
                  <div className="ml-auto text-sm font-medium text-slate-800">35</div>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-md border border-slate-100 bg-white">
                  <div className="w-2 h-2 rounded-full bg-slate-400" />
                  <div className="text-sm text-slate-700">Belum Tercacah</div>
                  <div className="ml-auto text-sm font-medium text-slate-800">65</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Tabs for Petugas / Wilayah */}
          <div>
            <div className="bg-slate-50 p-2 rounded-lg flex gap-2">
              <button onClick={() => setActiveTab('petugas')} className={`flex-1 py-2 rounded-md text-sm font-medium transition ${activeTab === 'petugas' ? 'bg-white shadow-sm text-primary' : 'text-slate-600'}`}>
                Progress Petugas
              </button>
              <button onClick={() => setActiveTab('wilayah')} className={`flex-1 py-2 rounded-md text-sm font-medium transition ${activeTab === 'wilayah' ? 'bg-white shadow-sm text-primary' : 'text-slate-600'}`}>
                Progress Wilayah
              </button>
            </div>

            <div className="mt-4 space-y-4">
              {activeTab === 'petugas' && (
                <>
                  {lowestThreePetugas.map((item: any) => (
                    <div key={item.id || item.name} className="bg-white border border-slate-100 rounded-xl p-3 shadow-sm">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <div className="text-sm font-semibold text-slate-800">{item.name}</div>
                          <div className="text-xs text-slate-500 mt-1">
                            Kurang {item.max - item.value} dari {item.max} sampel
                          </div>
                        </div>
                        <div className="text-sm font-medium text-slate-700">{Math.round((item.percentage || 0) * 100)}%</div>
                      </div>

                      {/* thin & elegant progress bar wrapper */}
                      <div className="mt-3">
                        {/* Keep using existing ProgressBar component; container makes it thin */}
                        <div className="h-full rounded-full overflow-hidden ">
                          {/* If ProgressBar renders its own bar, keep it; otherwise we still wrap it */}
                          <ProgressBar max={item.max} value={item.value} percentage={false} label={false} />
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="flex justify-end">
                    <Link to="/progress_petugas" className="btn btn-sm btn-ghost">
                      Lihat Progress Petugas Lainnya →
                    </Link>
                  </div>
                </>
              )}

              {activeTab === 'wilayah' && (
                <>
                  {lowestThreeProvinsi.map((item: any) => (
                    <div key={item.provinsi} className="bg-white border border-slate-100 rounded-xl p-3 shadow-sm">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <div className="text-sm font-semibold text-slate-800">{item.provinsi}</div>
                          <div className="text-xs text-slate-500 mt-1">
                            Kurang {item.totalMax - item.totalValue} dari {item.totalMax} sampel
                          </div>
                        </div>
                        <div className="text-sm font-medium text-slate-700">{Math.round((item.percentage || 0) * 100)}%</div>
                      </div>

                      <div className="mt-3">
                        <div className="h-full rounded-full overflow-hidden ">
                          <ProgressBar max={item.totalMax} value={item.totalValue} percentage={false} label={false} />
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="flex justify-end">
                    <Link to="/progress_wilayah" className="btn btn-sm btn-ghost">
                      Lihat Progress Wilayah Lainnya →
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
