function CardLoader({ img, name, price, unit }) {
  return (
    <div className="w-[158px] h-[247px] lg:w-[172px] lg:h-[300px] border-[1px] border-slate-100 rounded-xl shadow-md relative cursor-pointer">
      <div className="animate-pulse">
        <div className="w-[134px] h-[173px] mx-[auto] mt-[12px] lg:w-[150px] lg:h-[230px] lg:mt-[20px] rounded-lg">
          <div className="lg:h-[143px] h-[86px] bg-slate-200 overflow-hidden relative rounded-lg"></div>
          <div className="h-[17px] lg:h-[20px] bg-slate-200 mt-2 rounded-xl"></div>
          <div className="flex items-center  h-[21px] mb-[4px] lg:h-[24px] lg:mb-[7px] mt-[8px] bg-slate-200 rounded-xl">
            <div className="border-2 rounded-md px-1 font-semibold"></div>
            <div className="pl-2 line-through decoration-1 "></div>
          </div>
          <div className="flex justify-between text-sm bg-slate-200 items-center rounded-xl h-[17px] lg:h-[20px] "></div>
        </div>
        <div
          className="border-2 rounded-md  w-[134px] h-[32px] mx-auto mt-[12px] 
          lg:w-[130px] lg:h-[30px] lg:mt-[7px] text-center py-1"
        ></div>
      </div>
    </div>
  );
}

export default CardLoader;
