import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import Footer from "../../../components/Footer";
import Navbar from "../../../components/navbar";
import { API_URL } from "../../../helpers";

function ProductDetail() {
  const route = useRouter();
  let { product_id } = route.query;
  product_id = parseInt(product_id);

  const [data, setData] = useState({});

  const getProductDetail = async () => {
    try {
      let res = await axios.get(
        `${API_URL}/products/getdetailproduct/${product_id}`
      );
      setData(res.data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProductDetail();
  }, []);

  return (
    <>
      <Navbar />

      <div className="user-container">
        {/* Breadcrumb */}
        <div className="mb-[38px]">
          <span className="text-secondary">Beranda / Kategori / Obat</span>
        </div>

        {/* Product detail*/}
        <div className="flex">
          <div>
            <div
              className="lg:w-[405px] lg:h-[300px] border-[1px] border-slate-200 
            rounded-lg shadow-lg shadow-slate-200"
            >
              <div className="lg:w-[223px] h-[239px] bg-slate-200 overflow-hidden relative">
                <Image
                  src={`${API_URL}${data.images[0].image}`}
                  layout="fill"
                  objectFit="cover"
                ></Image>
                {data.name}
              </div>
            </div>
            <div>
              {/* Button */}
              {data.name}
            </div>
          </div>
          <div>{/* Other information */}</div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default ProductDetail;

export async function getServerSideProps() {
  return {
    props: {}, // will be passed to the page component as props
  };
}
