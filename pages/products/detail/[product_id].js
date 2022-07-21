import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Footer from "../../../components/Footer";
import Navbar from "../../../components/navbar";
import { API_URL } from "../../../helpers";
import HomePopularProductCarousel from "../../../components/HomePopularProductCarousel";
import ProductDetailMainPage from "../../../components/ProductDetailMainPage";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import Link from "next/link";
import healthymedlogo from "../../../public/healthymed-logo.svg";
import MetaDecorator from "../../../components/MetaDecorator";

function ProductDetail({ product, productTerkait }) {
  const route = useRouter();

  const [description, setDescription] = useState([]);
  const [produk, setProduk] = useState({});
  const [usage, setUsage] = useState("");
  const [warning, setWarning] = useState("");
  const [quantity, setQuantity] = useState(1);
  let token = Cookies.get("token");
  const [isLoading, setIsLoading] = useState(false);
  const [produkTerkait, setProdukTerkait] = useState([]);

  useEffect(() => {
    let descriptions = Object.entries(product.description);
    setDescription(descriptions);
    setUsage(product.usage);
    setWarning(product.warning);
    setProdukTerkait([...productTerkait]);
    setProduk(product);
    console.log(product);
    console.log(produkTerkait);
  }, []);

  const increase = () => {
    let count = parseInt(quantity) + 1;
    count = count >= product.total_stock ? product.total_stock : count;
    setQuantity(count);
  };

  const decrease = () => {
    let count = parseInt(quantity) - 1;
    count = count < 1 ? 1 : count;
    setQuantity(count);
  };

  const handleChange = (e) => {
    if (e.target.value >= product.total_stock) {
      setQuantity(product.total_stock);
    } else if (!e.target.value) {
      setQuantity(1);
    } else {
      setQuantity(e.target.value);
    }
  };

  const onBuyClick = async () => {
    try {
      if (!token) {
        toast.warn("Kamu belum login, silahkan login terlebih dahulu.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        route.push("/login");
      } else {
        let res = await axios.post(
          `${API_URL}/products/addtocart`,
          {
            product_id: product.id,
            quantity: quantity,
          },
          {
            headers: { authorization: `Bearer ${token}` },
          }
        );
        toast.success("Produk berhasil ditambahkan ke cart.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setIsLoading(true);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || "Network Error", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div>
        <MetaDecorator
          title={`${product.name} / Healthymed`}
          description={`${product.name} - ${product.description["Nomor Ijin Edar (NIE)"]} - ${product.description["indikasi / kegunaan"]}`}
          imageUrl={product.images[0].image}
        />
      </div>
      <>
        <Navbar />

        <div className="user-container">
          {/* Breadcrumb */}
          <div className="mb-[38px]">
            <Link href="/">
              <a className="text-secondary hover:text-primary">Beranda / </a>
            </Link>
            <Link href={`/products/${product.brand_id}`}>
              <a className="text-secondary hover:text-primary">Kategori /</a>
            </Link>
            <span className="text-primary"> {product.name}</span>
          </div>

          {/* Product detail*/}
          <ProductDetailMainPage
            product={produk}
            decrease={decrease}
            increase={increase}
            onBuyClick={onBuyClick}
            description={description}
            quantity={quantity}
            handleChange={handleChange}
          />

          <div className="border-b-2 mt-[50px]"></div>

          {/* Product Terkait */}
          <div className="mt-[60px] text-2xl text-primary font-bold">
            Produk Terkait
          </div>
          <div className="mt-[28px]">
            <HomePopularProductCarousel data={produkTerkait} />
          </div>
        </div>

        <Footer />
      </>
    </>
  );
}

export default ProductDetail;

export async function getServerSideProps(context) {
  const { query, req, res } = context;

  try {
    const product_id = query.product_id;
    const brand = query.brand;

    const detailProductReq = axios.get(
      `${API_URL}/products/getdetailproduct/${product_id}`
    );
    const produkTerkaitReq = axios.get(
      `${API_URL}/products/getprodukterkait?brand=${brand}`
    );

    const [product, productTerkait] = await Promise.all([
      detailProductReq,
      produkTerkaitReq,
    ]);
    return {
      props: { product: product.data[0], productTerkait: productTerkait.data }, // will be passed to the page component as props
    };
  } catch {
    res.status = 404;
    return {
      props: {},
    };
  }
}
