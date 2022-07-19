import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { add, addDays } from "date-fns";

function Pagination({
  totalData,
  dataPerPage,
  pageChangeHandler,
  totalPage,
  startDate,
  endDate,
  dateRange,
  setDateRange,
}) {
  const [currentPage, setCurrentPage] = useState(0);
  const [pageFirstRecord, setPageFirstRecord] = useState(1);
  const [pageLastRecord, setPageLastRecord] = useState(dataPerPage);

  const onNextPage = () => setCurrentPage(currentPage + 1);
  const onPrevPage = () => setCurrentPage(currentPage - 1);
  const onPageSelect = (page) => setCurrentPage(page);

  // const [dateRange, setDateRange] = useState([null, null]);
  // const [startDate, endDate] = dateRange;

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
    console.log(new Date(startDate).toISOString().slice(0, 10));
    console.log(new Date(endDate).toISOString().slice(0, 10));
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
          <div>
            Menampilkan {pageFirstRecord} - {pageLastRecord} dari {totalData}
          </div>
          <div className="flex">
            <DatePicker
              className="w-[210px] border-2 rounded-lg bg-white text-slate-400 text-sm font-semibold  border-slate-300 px-[12px] py-[13px]"
              selectsRange={true}
              startDate={startDate}
              endDate={endDate}
              onChange={(update) => {
                setDateRange(update);
              }}
              isClearable={true}
              placeholderText="Pilih Tanggal"
            />
          </div>
          <div className="flex">
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
