import Head from "next/head";
import Layout from "../components/layout";

export default function MyApp({ Component }) {
  return (
    <Layout>
      <Head>
        <link rel="shortcut icon" href="/vercel.svg" />
      </Head>
      <Component />
    </Layout>
  )
}