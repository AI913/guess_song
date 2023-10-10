import { LyricsProvider } from "../contexts/LyricsContext";
import Layout from "../lib/Layout";
import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <LyricsProvider>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </LyricsProvider>
    </Layout>
  );
}

export default MyApp;
