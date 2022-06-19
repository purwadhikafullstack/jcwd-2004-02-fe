import { useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

function Pagination({ totalData, dataPerPage, pageChangeHandler }) {
  const totalPage = Math.ceil(totalData / dataPerPage);
  const pageArr = [...new Array(totalPage)];

  const [currentPage, setCurrentPage] = useState(0);
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoNext, setCanGoNext] = useState(true);

  const [pageFirstRecord, setPageFirstRecord] = useState(1);
  const [pageLastRecord, setPageLastRecord] = useState(dataPerPage);

  const onNextPage = () => setCurrentPage(currentPage + 1);
  const onPrevPage = () => setCurrentPage(currentPage - 1);
  const onPageSelect = (page) => setCurrentPage(page);

  const [pagination, setPagination] = useState([]);

  const PaginationBar = () => {
    if (totalPage < 6) {
      setPagination([...new Array(5)]);
    } else {
      if (currentPage <= 2) {
        setPagination([1, 2, 3, "...", totalPage]);
      } else if (2 < currentPage && currentPage < totalPage - 3) {
        setPagination([1, "...", currentPage + 1, "...", totalPage]);
      } else if (currentPage >= totalPage - 3) {
        setPagination([1, "...", totalPage - 2, totalPage - 1, totalPage]);
      }
    }
  };

  useEffect(() => {
    if (totalPage === currentPage) {
      setCanGoNext(false);
    } else {
      setCanGoNext(true);
    }

    if (currentPage === 0) {
      setCanGoBack(false);
    } else {
      setCanGoBack(true);
    }
  }, [totalPage, currentPage]);

  useEffect(() => {
    if (totalPage < 6) {
      setPagination([...new Array(5)]);
      console.log("1");
    } else {
      setPagination([1, 2, 3, "...", 5]);
      console.log("2");
    }
    console.log(pagination, "ini child");
  }, []);

  useEffect(() => {
    const skipFactor = currentPage * dataPerPage;
    pageChangeHandler(currentPage);
    setPageFirstRecord(skipFactor + 1);
    PaginationBar();
  }, [currentPage]);

  useEffect(() => {
    const count = pageFirstRecord + dataPerPage;
    setPageLastRecord(count > totalData ? totalData : count - 1);
  }, [pageFirstRecord, dataPerPage, totalData]);

  return (
    <>
      {totalPage > 1 ? (
        <div className="flex justify-between h-[60px] items-center px-[14px]">
          <div>
            Menampilkan {pageFirstRecord} - {pageLastRecord} dari {totalData}
          </div>
          <div className="flex items-center">
            <div>Baris per halaman</div>
            <div className="border-2 rounded-lg text-purple-500 border-purple-500 w-[72px] p-1 ml-2">
              <select
                className="text-sm font-medium outline-none w-full"
                placeholder="Filter"
              >
                <option value="#">10</option>
                <option value="saab">20</option>
                <option value="opel">30</option>
                <option value="audi">40</option>
              </select>
            </div>
          </div>
          <div className="flex">
            <button onClick={onPrevPage} disabled={!canGoBack}>
              <IoIosArrowBack />
            </button>
            {/* <>
              {pageArr.map((num, index) => {
                return (
                  <>
                    {currentPage === index ? (
                      <button key={index} className="bg-purple-400">
                        {index + 1}
                      </button>
                    ) : (
                      <button onClick={() => onPageSelect(index)}>
                        {index + 1}
                      </button>
                    )}
                  </>
                );
              })}
            </> */}
            <>
              {pagination.map((val, index) => {
                return (
                  <>
                    {val == currentPage + 1 ? (
                      <button
                        key={index}
                        className="w-[26px] shadow-md text-white text-sm p-1 font-semibold rounded-full bg-purple-400 mx-1"
                      >
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
                  </>
                );
              })}
            </>
            <button onClick={onNextPage} disabled={!canGoNext}>
              <IoIosArrowForward />
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default Pagination;
