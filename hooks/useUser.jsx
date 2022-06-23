import { useSelector, useDispatch } from "react-redux";
// UNTUK CUSTOM HOOK PAKAI NAMA FUNCTION DEPANNYA USE
const useUser = () => {
  const user = useSelector((state) => state.user);
  //   const dispatch = useDispatch();

  return user;
};

export default useUser;