import dayjs from "dayjs";
import { useState } from "react";
import { useEffect } from "react";

const BoxTimePayment = ({ created_at, expired_at }) => {
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let time = setInterval(() => {
      setTimer(new Date());
    }, 1000);

    return () => clearInterval(time);
  }, []);

  const countdown = (time, type) => {
    let expired = new Date(expired_at).getTime();
    let now = new Date(time).getTime();
    let detik = Math.round((expired - now) / 1000);
    if (detik < 0) {
      return 0;
    }

    let jam = Math.floor(detik / 3600);
    detik = detik % 3600;
    if (type === "jam") {
      return jam;
    }

    let menit = Math.floor(detik / 60);
    detik = detik % 60;
    if (type === "menit") {
      return menit;
    }

    return detik;
  };
  return (
    <div className="w-[800px] h-[105px] rounded-lg p-4 shadow-md">
      <div className="flex">
        <div className="ml-5 flex flex-col mt-3">
          <span>Batas Akhir Pembayaran</span>
          <span className="font-bold text-purple-900">
            {dayjs(expired_at).add(1, "day").format("DD MMMM YYYY hh:mm:ss A")}
          </span>
        </div>
        <div className=" w-[400px] ml-20 flex items-center justify-end gap-2">
          <div className="w-[32px] h-[32px] font-bold text-xs text-white rounded-md bg-orange-600 text-center p-2">
            {countdown(timer, "jam")}
          </div>
          <span className="text-xl text-orange-400 font-bold">:</span>
          <div className="w-[32px] h-[32px] font-bold text-xs text-white rounded-md bg-orange-600 text-center p-2">
            {countdown(timer, "menit")}
          </div>
          <span className="text-xl text-orange-400 font-bold">:</span>
          <div className="w-[32px] h-[32px] font-bold text-xs text-white rounded-md bg-orange-600 text-center p-2">
            {countdown(timer, "detik")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoxTimePayment;
