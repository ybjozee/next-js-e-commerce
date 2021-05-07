import "../styles/index.css";
import Layout from "../components/Layout";
import CartContextProvider from "../utils/context";

function MyApp({ Component, pageProps }) {
  return (
    <CartContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </CartContextProvider>
  );
}

export default MyApp;
