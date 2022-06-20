import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import "../styles/styles.css";
import { Provider } from "react-redux";
import { store } from "./../redux/reducers";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
