import mediumZoom from "medium-zoom";
import { GetServerSideProps } from "next";
import classes from "../styles/art.module.scss";
import { useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";

interface IndexItem {
  id: string;
  title: string;
  link: string;
  description: string;
  imageUrls: string[];
  specificCategory: string[];
  parentCategory: string;
  featuredArt: boolean;
  date: Date;
}

export const getServerSideProps: GetServerSideProps<{
  data: IndexItem[];
}> = async () => {
  const docId = "5hYjdHt-Rs";
  const gridId =
    "grid-sync-1054-Table-dynamic-91a21264ba5189ae869bfd39fc74c2deec9488c8ffe5267f43ef07b20fdef4e8";
  const resp = await fetch(
    `https://opencoda.spencerc99.workers.dev/${docId}/${gridId}`
  );
  const data = await resp.json();
  return {
    props: {
      data: data.filter(
        (d) => d.featuredArt || d["Featured art"] // || d.specificCategory.includes("Art")
      ),
    },
  };
};

interface Props {
  data: IndexItem[];
}

function RegistryItem({ item }: { item: IndexItem }) {
  const {
    title,
    id,
    link,
    description,
    imageUrls,
    date,
    specificCategory,
    parentCategory,
  } = item;
  const image = imageUrls ? imageUrls[0] : undefined;

  return (
    <div className={classes.registryItem} key={id}>
      {/* <span>
        {parentCategory}-{specificCategory}
      </span> */}
      <img
        src={image}
        className={classes.registryImage}
        loading="lazy"
        data-zoomable
        alt={`still of ${title}`}
        title={`still image of ${title}`}
      />
      <div>
        <div className={classes.registryItemHeader}>
          <a href={link}>
            <h3>{title}</h3>
          </a>
          <span className={classes.registryItemDate}>
            {dayjs(date).format("MM/YYYY")}
          </span>
        </div>
        {description.split("\n").map((d, i) => (
          <p key={i}>{d}</p>
        ))}
      </div>
    </div>
  );
}

export default function ArtPortfolio({ data }: Props) {
  useEffect(() => {
    mediumZoom("[data-zoomable]", {
      background: "rgba(0, 0, 0, 0.5)",
    });
  }, []);
  return (
    <>
      <main>
        <h2>spencer's art</h2>
        <p>
          Spencer Chang (he/they) is a San Francisco-based artist, designer and
          programmer who creates infrastructure to create space for alternate
          internet imaginations from the dominant single narrative. Through his
          crafted infrastructure (tools|games|websites|spaces), he creates
          environments that give visitors creative agency for creating their own
          technological narratives, uncovering the unexpected poetics in our
          everyday actions and solidarity in our casual encounters. By focusing
          on infrastructural work, Spencer continues the path laid by
          "maintenance art," where "the working is the art," to imagine,
          realize, and maintain foundations that enable people to subvert their
          own assumptions about what computers are and who we are in relation to
          them.
        </p>
        <p>
          Their work has been shown at conferences in Amsterdam, CultureHub in
          New York, and the DeYoung Museum in San Francisco.{" "}
          <a href="https://docs.google.com/document/d/1IX3UIaOtp8la1eDbmkBS0tXekS1VKkuvZpyfBkTVCyA/edit">
            Full Artist CV
          </a>
        </p>
        <br />
        <br />
        <div className={classes.registry}>
          {/* TODO: embed a bit of each piece into each */}
          {/* - fridge magnets */}
          {/* - html plants */}
          {/* - fingerprints + cursors + signature animation ? */}
          {/* - blinking photo w diff results */}
          {/* - a mini-playable game */}
          {/* - make the description use it / turn on playground mode to modify it */}
          {data.map((d) => (
            <RegistryItem key={d.id} item={d} />
          ))}
        </div>
      </main>
      <footer>
        {/* <div>designed by spencer chang</div> */}
        <div className={classes.stamps}>
          <img src="/name-stamp.png" />
          <img src="/name-stamp.png" />
          <img src="/name-stamp.png" />
        </div>
      </footer>
    </>
  );
}
