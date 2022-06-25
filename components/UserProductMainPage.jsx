function UserProductMainPage() {
  return (
    <div className=" w-[900px]">
      <div className="text-2xl font-bold text-violet-900 pb-[16px] border-b-2">
        Obat
      </div>
      <div className="flex mt-[24px] justify-between items-center">
        <div className="text-slate-400">45 Produk di Obat-obatan</div>
        <div className="flex items-center">
          <div className="text-slate-400">Urutkan</div>
          <div className="border-2 rounded-lg text-slate-400 border-slate-300 py-1 w-[137px] px-1 h-[36px] ml-[16px]">
            <select
              className="text-sm font-medium outline-none w-full"
              placeholder="Terpopular"
              name="category"
            >
              <option value="">Terpopular</option>
            </select>
          </div>
        </div>
      </div>
      <div className="mt-[36px] grid grid-cols-4 gap-4">
        {data.map((val, ind) => {
          return (
            <>
              <CardCart
                key={ind}
                img={`${API_URL}${val.image}`}
                name={val.name}
                price={val.hargaJual}
                unit={val.type_name}
              />
            </>
          );
        })}
      </div>
    </div>
  );
}

export default UserProductMainPage;
