import AdminNavbar from "../../components/AdminNavbar";
import AdminSidebar from "../../components/AdminSidebar";
import ModalInputAdmin from "../../components/admin/ModalInputAdmin";
import AdminEditDetail from "../../components/admin/adminEditDetail";
import AdminEditFoto from "../../components/admin/adminEditFoto";
import AdminEditStockTable from "../../components/admin/adminEditStockTable";
import { FiDownload } from "react-icons/fi";
import { IoDocumentText } from "react-icons/io5";
import { HiSearch, HiDotsVertical } from "react-icons/hi";
import NewTable from "../../components/Table";
import { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { API_URL } from "../../helpers";
import Pagination from "../../components/Pagination";
import debounce from "lodash.debounce";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  useDisclosure,
  MenuDivider,
} from "@chakra-ui/react";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import healthymedlogo from "../../public/healthymed-logo.svg";
import MetaDecorator from "../../components/MetaDecorator";

function DaftarProduk() {
  const [page, setPage] = useState(0);
  const [data, setData] = useState([]);
  const [totalData, setTotalData] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [input, setInput] = useState({
    search: "",
    category: "",
    order: "",
  });
  const [value, setLimit] = useState(10);
  const [comp, setComponent] = useState([]);
  // state input edit
  const [inputEdit, setinputEdit] = useState({
    name: "",
    no_obat: "",
    no_BPOM: 0,
    category: [],
    brand_id: 0,
    type_id: 0,
    symptom: [],

    description: {},
    warning: "",
    usage: "",
    id: 0,
    unit: "",
    hargaJual: 0,
    hargaBeli: 0,
  });
  // state input stock
  const [inputStock, setinputStock] = useState([
    {
      stock: 0,
      expired: "",
      id: 0,
    },
  ]);
  // state input edit stock
  const [inputStockDet, setinputStockDet] = useState({
    stock: 0,
    expired: "",
    id: 0, // id stock
  });
  // state input add stock
  const [inputStockAdd, setinputStockAdd] = useState({
    stock: 0,
    expired: "",
  });
  // state delete stock
  const [deleteStock, setdeleteStock] = useState({ stock: 0 });

  const [inputImage, setinputImage] = useState([]);
  // state product_id
  const [productStockId, setproductStockId] = useState(0);

  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();
  const {
    isOpen: isEditPhotoOpen,
    onOpen: onEditPhotoOpen,
    onClose: onEditPhotoClose,
  } = useDisclosure();
  const {
    isOpen: isEditStockOpen,
    onOpen: onEditStockOpen,
    onClose: onEditStockClose,
  } = useDisclosure();
  const {
    isOpen: isEditStockOpen2,
    onOpen: onEditStockOpen2,
    onClose: onEditStockClose2,
  } = useDisclosure();
  const {
    isOpen: isEditStockOpen3,
    onOpen: onEditStockOpen3,
    onClose: onEditStockClose3,
  } = useDisclosure();
  // const [pending, startTransition] = useTransition();

  useEffect(() => {
    getComponent();
  }, []);

  useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  }, [isLoading]);

  useEffect(() => {
    debouncedFetchData(page, input, (res) => {
      setTotalData(parseInt(res.headers["x-total-product"]));
      setData([...res.data]);
      setIsLoading(false);
    });
    console.log(totalData, "ini total data");
  }, [page, input]);

  const updateLimit = (e) => {
    setLimit(parseInt(e.target.value));
  };

  const handleInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
    setPage(0);
  };

  const getComponent = async () => {
    let res2 = await axios.get(`${API_URL}/products/getcategory`);
    setComponent([...res2.data]);
  };

  const getDaftarProduk = async (page, input, cb) => {
    // token + headers
    let res = await axios.get(
      `${API_URL}/products/fetchdaftarproduk?page=${page}&search=${input.search}&category=${input.category}&order=${input.order}`
    ); // FIXME Dipersingkat querynya (dibuat conditional)
    cb(res);
  };

  const getLastProduct = async () => {
    // token + headers
    let res = axios.get(`${API_URL}/products/getlastproduct`);
    console.log(res.headers);
    // setTotalData(parseInt(res.headers["x-total-product"]));
    setData([...data, ...res.data]);
  };

  // fetch detail obat untuk edit
  const fetchDetailObat = async (id) => {
    try {
      let res = await axios.get(`${API_URL}/products/product/${id}`);
      setinputEdit(res.data);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message, {
        position: "top-right",
        autoClose: 1500,
        closeOnClick: true,
        draggable: true,
      });
    }
  };

  const fetchFoto = async (id) => {
    try {
      let res = await axios.get(`${API_URL}/products/productpic/${id}`);
      console.log("resdatafoto", res.data);

      setinputImage(res.data);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message, {
        position: "top-right",
        autoClose: 1500,
        closeOnClick: true,
        draggable: true,
      });
    }
  };

  // fetch detail obat untuk edit
  const fetchStock = async (id) => {
    try {
      let res = await axios.get(`${API_URL}/products/stock/${id}`);
      setinputStock(res.data);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message, {
        position: "top-right",
        autoClose: 1500,
        closeOnClick: true,
        draggable: true,
      });
    }
  };

  const submitProduct = async (values) => {
    try {
      let token = Cookies.get("token");
      await axios.post(`${API_URL}/products/addproduct`, values, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message, {
        position: "top-right",
        autoClose: 1500,
        closeOnClick: true,
        draggable: true,
      });
    } finally {
      // getLastProduct();
      setPage(0);
      setInput({
        search: "",
        category: "",
      });
    }
  };

  const submitProductEdit = async (data) => {
    try {
      let token = Cookies.get("token");
      await axios.put(`${API_URL}/products/${inputEdit.id}`, data, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      console.log(data, "vall");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message, {
        position: "top-right",
        autoClose: 1500,
        closeOnClick: true,
        draggable: true,
      });
    } finally {
      // getLastProduct();
      setPage(0);
      setInput({
        search: "",
        category: "",
      });
    }
  };

  const submitProductEditStock = async (data) => {
    try {
      let token = Cookies.get("token");
      await axios.put(
        `${API_URL}/products/stock/edit/${inputStockDet.id}`,
        data,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data, "vall");
      fetchStock(productStockId);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message, {
        position: "top-right",
        autoClose: 1000,
        closeOnClick: true,
        draggable: true,
      });
    }
  };

  const submitProductAddStock = async (data) => {
    console.log(data, "data");
    console.log(productStockId, "id nya");
    try {
      let token = Cookies.get("token");
      await axios.post(
        `${API_URL}/products/stock/add/${productStockId}`,
        data,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data, "vall");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message, {
        position: "top-right",
        autoClose: 1500,
        closeOnClick: true,
        draggable: true,
      });
    } finally {
      // getLastProduct();
      setPage(0);
      setInput({
        search: "",
        category: "",
      });
    }
  };

  // delete feature
  const clickDelete = async (id) => {
    try {
      Swal.fire({
        customClass: {
          container: "my-swal",
        },
        title: "Apakah anda yakin?",
        text: "Produk tidak akan bisa dikembalikan!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#ac5df7",
        cancelButtonColor: "#d33",
        confirmButtonText: "Hapus",
      }).then(async (result) => {
        if (result.isConfirmed) {
          let token = Cookies.get("token");
          await axios.patch(`${API_URL}/products/deleteproducts/${id}`, {
            headers: {
              authorization: `Bearer ${token}`,
            },
          });
          Swal.fire("Deleted!", "Berhasil dihapus!", "success");
        }
      });
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message, {
        position: "top-right",
        autoClose: 1500,
        closeOnClick: true,
        draggable: true,
      });
    } finally {
      // getLastProduct();
      setPage(0);
      setInput({
        search: "",
        category: "",
      });
    }
  };

  const debouncedFetchData = useCallback(
    debounce((page, input, cb) => {
      getDaftarProduk(page, input, cb);
    }, 1000),
    []
  );

  const Categories = ({ val }) => {
    return (
      <>
        {val.map((category, i) => {
          return (
            <>
              <span
                key={i}
                className="bg-violet-300 font-semibold capitalize py-1 px-2 mr-1 text-sm rounded-xl"
              >
                {category.name}
              </span>
            </>
          );
        })}
      </>
    );
  };
  // click modal edit
  const clickEdit = (productId) => {
    fetchDetailObat(productId);
    onEditOpen();
  };
  // click modal edit photo
  const clickEditPhoto = (productId) => {
    fetchFoto(productId);
    onEditPhotoOpen();
  };
  // click modal edit stock
  const clickEditStock = (productId) => {
    fetchStock(productId);
    setproductStockId(productId);
    onEditStockOpen();
  };
  // click modal edit stock detail
  const clickEditStockDetail = (inputselected) => {
    setinputStockDet(inputselected);
    onEditStockOpen2();
  };
  // click modal add stock
  const clickAddStock = (inputselected) => {
    setinputStockAdd(inputselected);
    onEditStockOpen3();
  };

  // click delete stock
  const clickDeleteStock = async (id, productId) => {
    // setinputStockDet(id);
    console.log(id, "id");
    try {
      Swal.fire({
        customClass: {
          container: "my-swal",
        },
        title: "Apakah anda yakin?",
        text: "Produk tidak akan bisa dikembalikan!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#ac5df7",
        cancelButtonColor: "#d33",
        confirmButtonText: "Hapus",
      }).then(async (result) => {
        if (result.isConfirmed) {
          let token = Cookies.get("token");
          await axios.delete(`${API_URL}/products/stock/delete/${id}`, {
            headers: {
              authorization: `Bearer ${token}`,
            },
          });
          console.log("sukses");
          Swal.fire({
            customClass: {
              container: "my-swal",
            },

            icon: "success",
            title: "Deleted",
            text: "Berhasil dihapus!",
          });
          // "Deleted!", "Berhasil dihapus!", "success"
        }
        fetchStock(productStockId);
      });
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message, {
        position: "top-right",
        autoClose: 1500,
        closeOnClick: true,
        draggable: true,
      });
    } finally {
      // getLastProduct();
      setPage(0);
      setInput({
        search: "",
        category: "",
      });
    }
  };

  // increment utk kuantitas stock
  const incNum = () => {
    let count = parseInt(inputStockDet.stock) + 1;
    setinputStockDet({ ...inputStockDet, stock: count });
  };

  const decNum = () => {
    let count = parseInt(inputStockDet.stock) - 1;
    count = count < 1 ? 1 : count;
    setinputStockDet({ ...inputStockDet, stock: count });
  };

  const incNumAdd = () => {
    let count = parseInt(inputStockAdd?.stock) + 1;
    setinputStockAdd({ ...inputStockAdd, stock: count });
  };

  const decNumAdd = () => {
    let count = parseInt(inputStockAdd?.stock) - 1;
    count = count < 1 ? 1 : count;
    setinputStockAdd({ ...inputStockAdd, stock: count });
  };

  // console.log(inputEdit, "inputedit");
  const DetailButton = ({ productId }) => {
    return (
      <div className="flex justify-between text-center items-center">
        <div className="flex items-center justify-center text-sm text-primary rounded-lg font-semibold py-1 px-2 border-[1px] mr-2 border-primary bg-white h-10 ">
          Lihat Detail
        </div>
        {/* <div className="text-sm text-primary rounded-md font-semibold py-2 px border-[1px] border-primary bg-white"> */}
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<HiDotsVertical />}
            backgroundColor="white"
            border="1px"
            borderColor="border-primary"
            textColor="purple.700"
          />
          <MenuList>
            <MenuItem
              onClick={() => {
                clickEdit(productId);
              }}
            >
              <div className="text-primary font-medium">Edit Produk</div>
            </MenuItem>
            <MenuItem
              onClick={() => {
                clickEditStock(productId);
              }}
            >
              <div className="text-primary font-medium">Edit Stok</div>
            </MenuItem>
            <MenuItem
              onClick={() => {
                clickEditPhoto(productId);
              }}
            >
              <div className="text-primary font-medium">Edit Foto</div>
            </MenuItem>
            <MenuDivider />
            <MenuItem
              onClick={() => {
                clickDelete(productId);
              }}
            >
              <div className="text-red-600 font-medium">Hapus Produk</div>
            </MenuItem>
          </MenuList>
        </Menu>
        {/* </div> */}
      </div>
    );
  };

  const columns = useMemo(() => [
    {
      Header: "No",
      accessor: "id",
      isNumeric: true,
    },
    {
      Header: "Nama Obat",
      accessor: "name",
    },
    {
      Header: "No Obat",
      accessor: "no_obat",
    },
    {
      Header: "No BPOM",
      accessor: "no_BPOM",
    },
    {
      Header: "Kategori",
      accessor: "categories",
      Cell: ({ cell: { value } }) => <Categories val={value} />,
    },
    {
      Header: "Stok",
      accessor: "total_stock",
      isNumeric: true,
    },
    {
      Header: "Satuan",
      accessor: "unit",
    },
    {
      Header: "Nilai Barang",
      accessor: "hargaBeli",
    },
    {
      Header: "Nilai Jual",
      accessor: "hargaJual",
    },
    {
      Header: "Atur",
      // accessor: "id",
      Cell: (data) => <DetailButton productId={data.row.original.id} />,
    },
  ]);

  return (
    <>
      <div>
        <MetaDecorator
          title={"Admin / Healthymed"}
          description={
            "Healthymed - Apotek Online Terpercaya. Beli obat yang kamu inginkan disini. 100% Asli, Produk BPOM, Uang Dijamin Kembali"
          }
          imageUrl={healthymedlogo}
        />
      </div>
      <>
        {/* kiri=props; kanan=value */}
        <div>
          <AdminEditDetail
            isOpen={isEditOpen}
            onOpen={onEditOpen}
            onClose={onEditClose}
            submitProductEdit={submitProductEdit}
            inputEdit={inputEdit}
            setinputEdit={setinputEdit}
          />
          <AdminEditFoto
            isOpen={isEditPhotoOpen}
            onOpen={onEditPhotoOpen}
            onClose={onEditPhotoClose}
            submitProduct={submitProduct}
            inputImage={inputImage}
            setinputImage={setinputImage}
            fetchFoto={fetchFoto}
          />
          <AdminEditStockTable
            isOpen={isEditStockOpen}
            onOpen={onEditStockOpen}
            onClose={onEditStockClose}
            isOpen2={isEditStockOpen2}
            onOpen2={onEditStockOpen2}
            onClose2={onEditStockClose2}
            isOpen3={isEditStockOpen3}
            onOpen3={onEditStockOpen3}
            onClose3={onEditStockClose3}
            submitProduct={submitProduct}
            inputStock={inputStock}
            setinputStock={setinputStock}
            clickEditStockDetail={clickEditStockDetail}
            inputStockDet={inputStockDet}
            setinputStockDet={setinputStockDet}
            incNum={incNum}
            decNum={decNum}
            incNumAdd={incNumAdd}
            decNumAdd={decNumAdd}
            submitProductEditStock={submitProductEditStock}
            submitProductAddStock={submitProductAddStock}
            inputStockAdd={inputStockAdd}
            setinputStockAdd={setinputStockAdd}
            clickAddStock={clickAddStock}
            clickDeleteStock={clickDeleteStock}
          />

          <AdminNavbar />
          <AdminSidebar />
        </div>

        <div className="bg-admin">
          <div className="px-[48px] pt-[32px] pb-[32px]">
            <div className="flex justify-between">
              <div className="text-lg font-bold text-violet-900 tracking-wide">
                Daftar Obat
              </div>
              <div className="flex">
                <div className="flex border-2 rounded-lg items-center px-4 py-2 text-purple-600 border-purple-500">
                  <FiDownload className="text-sm" />
                  <div className="text-xs font-semibold px-2">Unduh PDF</div>
                </div>
                <div className="flex border-2 rounded-lg items-center px-4 py-2 text-purple-600 border-purple-500 ml-5">
                  <IoDocumentText className="text-sm" />
                  <div className="text-xs font-semibold px-2">Excel</div>
                </div>
              </div>
            </div>
            <div className="p-[32px] mt-[34px] bg-white rounded-lg shadow-lg ">
              <div className="flex justify-between">
                <div className="text-lg font-bold text-violet-900 tracking-wide">
                  Daftar Obat
                </div>
                <div className="flex">
                  <div className="flex border-2 rounded-lg items-center px-4 py-2 text-purple-600 border-purple-500">
                    <FiDownload className="text-sm" />
                    <div className="text-xs font-semibold px-2">Unduh PDF</div>
                  </div>
                  <div className="flex border-2 rounded-lg items-center px-4 py-2 text-purple-600 border-purple-500 ml-5">
                    <IoDocumentText className="text-sm" />
                    <div className="text-xs font-semibold px-2">Excel</div>
                  </div>
                </div>
              </div>
              <div className="p-[32px] mt-[34px] bg-white rounded-lg shadow-lg">
                <div className="flex justify-between">
                  <div className="flex">
                    <div className="flex border-2 rounded-lg text-slate-400  border-slate-300 px-[12px] py-[11px] w-[328px] justify-between ">
                      <input
                        className="text-sm font-medium outline-none w-[270px]"
                        placeholder="Cari nama obat"
                        name="search"
                        value={input.search}
                        onChange={(e) => handleInput(e)}
                      ></input>
                      <HiSearch className="text-xl" />
                    </div>
                    <div className="border-2 rounded-lg text-slate-400 border-slate-300 px-[12px] py-[11px] w-[156px] ml-[16px]">
                      <select
                        className="text-sm font-medium outline-none w-full"
                        placeholder="Filter"
                        name="category"
                        value={input.category}
                        onChange={(e) => handleInput(e)}
                      >
                        <option value="">All</option>
                        {comp.map(({ id, name }) => {
                          return (
                            <>
                              <option value={id}>{name}</option>
                            </>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                  <ModalInputAdmin submitProduct={submitProduct} />
                  {/* <div className="flex items-center rounded-lg bg-violet-900 p-[11px] text-white">
                  <FiDownload className="text-sm" />
                  <div className="text-xs font-semibold px-2 tracking-wide">
                    Tambah Obat
                  </div>
                </div> */}
                </div>
                <div className="w-full border-b-2 mt-[38px]"></div>
                <div className="mt-[32px] rounded-lg border-2">
                  <NewTable
                    columns={columns}
                    data={data}
                    isLoading={isLoading}
                  />

                  <Pagination
                    totalData={totalData}
                    dataPerPage={10} // ganti value
                    pageChangeHandler={setPage}
                    updateLimit={updateLimit}
                    value={value}
                    totalPage={Math.ceil(totalData / 10)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
}

export default DaftarProduk;
