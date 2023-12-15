import styles from "../styles/Home.module.scss";
import Head from "next/head";
import { Activity, Status } from "./components/status";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps<{
  stream: Activity[];
}> = async () => {
  const resp = await fetch("https://status.spencerchang.me/api/me");
  const data = await resp.json();
  return { props: { stream: data } };
};

export default function Home({ stream }: { stream: Activity[] }) {
  return (
    <>
      <Head>
        <title>spencers website</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <main>
        {/* TODO: big orange circle background, all the sunsets from my photos? */}
        <h1 className={styles.title}>spencers.place 🟠</h1>
        <h4>who is spencer?</h4>
        <p>
          Spencer focuses on how we can create a more playful, expressive, and
          communal internet by giving people the agency of expressive relations,
          open protocols and local-first applications. He does this through
          creating (tools|games|spaces) that push how we're allowed to dictate
          digital places and objects, making site-specific net art that question
          our assumptions of what websites are and who we are when we visit
          them, and writing about his findings and the emotional journey of this
          independent path.
        </p>
        <p>
          They find it hard to describe themselves, so they prefer to reveal who
          they are through the things they care about. They've designed and
          built products at{" "}
          <a style={{ color: "green" }} href="">
            Square
          </a>
          , <a style={{ color: "red" }}>Airbnb</a>, and most recently{" "}
          <a style={{ color: "orange" }}>Coda</a>. Their art has been shown at
          the DeYoung, Frieze, and CultureHub. Their words have been published
          in WIRED, Kernel Magazine, and regularly in their newsletter{" "}
          <a href="">spencer's paradoxes</a>.
        </p>
        <div className="selectedProjects"></div>
      </main>
      <Status stream={stream} />
    </>
  );
}
