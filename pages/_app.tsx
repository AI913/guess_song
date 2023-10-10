import { LyricsProvider } from "../contexts/LyricsContext";
import Layout from "../lib/Layout";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <LyricsProvider>
        <Component {...pageProps} />
      </LyricsProvider>
    </Layout>
  );
}

export default MyApp;
