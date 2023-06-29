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
  const CodaApiToken = "b1b81cae-2cdd-46e3-96c4-99f2b02484f4";
  const docId = "_ObKm8enqO";
  const gridId = "grid-XKBPGXQRwp";
  const resp = await fetch(
    `https://coda.io/apis/v1/docs/${docId}/tables/${gridId}/rows?useColumnNames=true&valueFormat=simpleWithArrays&sortBy=natural`,
    {
      headers: {
        Authorization: `Bearer ${CodaApiToken}`,
      },
    }
  );
  const respBody = await resp.json();
  const dataMetadata = respBody.items;
  const data = dataMetadata.map((d) => d.values);
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
      <a href={link}>
        <h3>{title}</h3>
      </a>
      <p>{description}</p>
      <span>
        {parentCategory}-{specificCategory}
      </span>
      {image && <img src={image} className="registryImage" />}
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
