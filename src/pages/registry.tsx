import { GetServerSideProps } from "next";
import classes from "../styles/registry.module.scss";
import { useMemo, useState } from "react";

interface IndexItem {
  id: string;
  title: string;
  link: string;
  description: string;
  imageUrls: string[];
  specificCategory: string;
  parentCategory: string;
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
  return { props: { data } };
};

interface Props {
  data: IndexItem[];
}

function RegistryItem({ item }: { item: IndexItem }) {
  const {
    title,
    link,
    description,
    imageUrls,
    specificCategory,
    parentCategory,
  } = item;
  const image = imageUrls ? imageUrls[0] : undefined;
  return (
    <div className={classes.registryItem}>
      {/* <p>{description}</p> */}
      {/* <span>
        {parentCategory}-{specificCategory}
      </span> */}
      <figure>
        <img src={image} className={classes.registryImage} loading="lazy" />
        <figcaption>
          <a href={link}>
            <h3>{title}</h3>
          </a>
        </figcaption>
      </figure>
    </div>
  );
}

export default function Registry({ data }: Props) {
  const query = useMemo(() => new URLSearchParams(window.location.search), []);

  const allCategories = useMemo(
    () => new Set(data.map((d) => d.parentCategory).filter((d) => d)),
    [data]
  );

  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const filteredData = useMemo(
    () =>
      data.filter((d) => {
        if (selectedCategory === "all") {
          return true;
        }
        return d.parentCategory === selectedCategory;
      }),
    [data, selectedCategory]
  );

  return (
    <main>
      <div className={classes.filters}>
        <select
          onChange={(e) => {
            setSelectedCategory(e.target.value);
          }}
          value={selectedCategory}
        >
          <option value="all">All</option>
          {Array.from(allCategories).map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
      <div className={classes.registry}>
        {filteredData.map((d) => (
          <RegistryItem key={d.id} item={d} />
        ))}
      </div>
    </main>
  );
}
