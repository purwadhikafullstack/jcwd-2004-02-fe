const INITIAL_STATE = {
  id: 0,
  isLogin: false,
  error_mes: "",
  profilepic: "",
  name: "",
  email: "",
  gender: "",
  is_verified: "",
  role_id: "",
  birthdate: "",
  google_id: "",
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, isLogin: true, error_mes: "", ...action.payload };
    case "ERROR":
      return { error_mes: action.payload };
    case "UPDATEPIC":
      return { ...state, error_mes: "", profilepic: action.payload };
    case "LOGOUT":
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default userReducer;