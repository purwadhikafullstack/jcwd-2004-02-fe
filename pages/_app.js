import "../styles/globals.css";
import { Provider } from 'react-redux' 
import { store } from "./../redux/reducers";  
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 
import {ChakraProvider} from '@chakra-ui/react'  
import AuthProvider from '../components/authProvider';
import "../styles/styles.css";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ChakraProvider> 
        <AuthProvider>
          <Component {...pageProps} />
            <ToastContainer/>
        </AuthProvider>
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
