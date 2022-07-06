import { API_URL } from "../helpers";
import CardCart from "../components/CardCart";
import CardLoader from "../components/CartLoader";
import Pagination from "./UserPagination";
import Link from "next/link";

function UserProductMainPage({
  categorySelected,
  data,
  totalData,
  isLoading,
  input,
  handleInput,
  pageChangeHandler,
}) {
  return (
    <div className=" w-[900px]">
      <div className="text-2xl font-bold text-primary pb-[16px] border-b-2">
        {categorySelected}
      </div>
      <div className="flex mt-[24px] justify-between items-center">
        <div className="text-slate-400">
          {totalData} Produk di {categorySelected}
        </div>
        <div className="flex items-center">
          <div className="text-slate-400">Urutkan</div>
          <div className="border-2 rounded-lg text-slate-400 border-slate-300 py-1 w-[137px] px-1 h-[36px] ml-[16px]">
            <select
              className="text-sm font-medium outline-none w-full"
              placeholder="Urutkan"
              name="order"
              value={input.order}
              onChange={(e) => handleInput(e)}
            >
              <option value="">Terbaru</option>
              <option value="name">Nama</option>
              <option value="price">Harga</option>
            </select>
          </div>
        </div>
      </div>
      <div className="mt-[36px] grid grid-cols-4 gap-4">
        {isLoading ? (
          <>
            <CardLoader />
            <CardLoader />
            <CardLoader />
            <CardLoader />
          </>
        ) : (
          <>
            {data.map((val, ind) => {
              return (
                <Link
                  key={ind}
                  href={`/products/detail/${val.id}?brand=${val.brand_name}`}
                >
                  <div>
                    <CardCart
                      img={`${API_URL}${val.images[0].image}`}
                      name={val.name}
                      price={val.hargaJual}
                      unit={val.unit}
                    />
                  </div>
                </Link>
              );
            })}
          </>
        )}
      </div>
      {totalData >= 24 ? (
        <div>
          <Pagination
            totalData={totalData}
            dataPerPage={24}
            pageChangeHandler={pageChangeHandler}
            totalPage={Math.ceil(totalData / 24)}
          />
        </div>
      ) : null}
    </div>
  );
}

export default UserProductMainPage;
