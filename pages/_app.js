import "../styles/globals.css";
import { Provider } from "react-redux";
import { store } from "./../redux/reducers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import AuthProvider from "../components/authProvider";
import "../styles/styles.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function MyApp({ Component, pageProps }) {
  const theme = extendTheme({
    colors: {
      brand: {
        primary: "#6b4c92",
        secondary: "#c86eac",
        orange: "##f99746",
        warning: "#fff5d3",
        "warning-text": "##cbaf4e",
        "hover-button": "#efebf2",
      },
    },
  });

  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <AuthProvider>
          <Component {...pageProps} />
          <ToastContainer className={"foo"} />
        </AuthProvider>
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
