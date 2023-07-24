import styles from "../styles/Home.module.scss";
import Head from "next/head";
import { Status } from "./components/status";

export default function Home() {
  return (
    <>
      <Head>
        <title>spencers website</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <main>
        {/* TODO: big orange circle background, all the sunsets from my photos? */}
        <h1 className={styles.title}>spencers.place 🟠</h1>
      </main>
      <Status />
    </>
  );
}
