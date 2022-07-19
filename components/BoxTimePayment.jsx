import dayjs from "dayjs";

const BoxTimePayment = ({ created_at, expired_at }) => {
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
            24
          </div>
          <span className="text-xl text-orange-400 font-bold">:</span>
          <div className="w-[32px] h-[32px] font-bold text-xs text-white rounded-md bg-orange-600 text-center p-2">
            24
          </div>
          <span className="text-xl text-orange-400 font-bold">:</span>
          <div className="w-[32px] h-[32px] font-bold text-xs text-white rounded-md bg-orange-600 text-center p-2">
            24
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoxTimePayment;
