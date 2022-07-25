import Rupiah from "../helpers/convertToRupiah";

const RingkasanOrderCheckout = ({
  id,
  name,
  price,
  unit,
  totalHarga,
  quantityCart,
  image,
}) => {
  return (
    <div>
      <div className="flex ml-2">
        <div className="flex items-center">
          <div className=" md:w-[86px] w-[170px] h-[170px] md:h-[86px]">
            <img src={image || "/bisolvon.jpg"} />
          </div>
        </div>
        <div className="flex justify-between w-full">
          <div className="flex flex-col ml-8">
            <span className="md:text-lg text-2xl text-purple-900 font-semibold">
              {name}
            </span>
            <span className="md:text-xs text-2xl text-purple-900">
              {quantityCart} {unit}
            </span>
          </div>
          <div className="">
            <span className="font-bold text-purple-900">{Rupiah(price)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RingkasanOrderCheckout;
