import { GetServerSideProps } from "next";

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
  console.log(data);
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
    <div className="registryItem">
      {/* <p>{description}</p> */}
      {/* <span>
        {parentCategory}-{specificCategory}
      </span> */}
      <figure>
        <img src={image} className="registryImage" />
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
  return (
    <div className="registry">
      {data.map((d) => (
        <RegistryItem key={d.id} item={d} />
      ))}
    </div>
  );
}
