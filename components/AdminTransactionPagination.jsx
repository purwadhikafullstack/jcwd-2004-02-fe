import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

function Pagination({ totalData, dataPerPage, pageChangeHandler, totalPage }) {
  const [currentPage, setCurrentPage] = useState(0);

  const [pageFirstRecord, setPageFirstRecord] = useState(1);
  const [pageLastRecord, setPageLastRecord] = useState(dataPerPage);

  const onNextPage = () => setCurrentPage(currentPage + 1);
  const onPrevPage = () => setCurrentPage(currentPage - 1);
  const onPageSelect = (page) => setCurrentPage(page);

  const [pagination, setPagination] = useState([]);

  const PaginationBar = () => {
    if (totalPage < 6) {
      let page = [1, 2, 3, 4, 5];
      setPagination([...page]);
    } else {
      if (currentPage <= 2) {
        let page = [1, 2, 3, "...", totalPage];
        setPagination([...page]);
      } else if (2 < currentPage && currentPage < totalPage - 3) {
        setPagination([...[1, "...", currentPage + 1, "...", totalPage]]);
      } else if (currentPage >= totalPage - 3) {
        setPagination([...[1, "...", totalPage - 2, totalPage - 1, totalPage]]);
      }
    }
  };

  useEffect(() => {
    PaginationBar();
    console.log("first");
  }, []);

  useEffect(() => {
    const skipFactor = currentPage * dataPerPage;
    pageChangeHandler(currentPage);
    setPageFirstRecord(skipFactor + 1);
    PaginationBar();
    console.log("cur page");
  }, [currentPage]);

  useEffect(() => {
    const count = pageFirstRecord + dataPerPage;
    setPageLastRecord(count > totalData ? totalData : count - 1);
    console.log("page first & data & total");
  }, [pageFirstRecord, dataPerPage, totalData]);

  return (
    <>
      {totalPage >= 1 ? (
        <div className="flex justify-between h-[60px] items-center text-slate-400 ">
          <div className="flex items-center">
            <div>Kartu per halaman</div>
            <div className="border-2 rounded-lg text-purple-500 border-purple-500 w-[72px] p-1 ml-2 bg-white">
              <select
                className="text-sm font-medium outline-none w-full"
                placeholder="Limit"
                id="limit"
                // value={value}
                // onChange={(e) => updateLimit(e)}
              >
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
              </select>
            </div>
          </div>
          <div className="flex ml-[38px]">
            <button onClick={onPrevPage} disabled={currentPage === 0}>
              <IoIosArrowBack />
            </button>
            <>
              {pagination.map((val, index) => {
                return (
                  <div className="flex" key={index}>
                    {val == currentPage + 1 ? (
                      <button className="w-[26px] shadow-md text-white text-sm p-1 font-semibold rounded-full bg-purple-400 mx-1">
                        {val}
                      </button>
                    ) : (
                      <button
                        key={index}
                        onClick={() => onPageSelect(val - 1)}
                        className="w-[28px] text-sm  text-slate-500 font-semibold mx-1"
                      >
                        {val}
                      </button>
                    )}
                  </div>
                );
              })}
            </>
            <button
              onClick={onNextPage}
              disabled={totalPage - 1 === currentPage}
            >
              <IoIosArrowForward />
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default Pagination;
