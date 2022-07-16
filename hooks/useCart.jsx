import { useSelector, useDispatch } from "react-redux";
// UNTUK CUSTOM HOOK PAKAI NAMA FUNCTION DEPANNYA USE
const useCart = () => {
  const cart = useSelector((state) => state.cart);
  //   const dispatch = useDispatch();

  return cart;
};

export default useCart;
