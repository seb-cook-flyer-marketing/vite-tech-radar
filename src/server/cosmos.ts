import { CosmosClient } from "@azure/cosmos";
import { nanoid } from "nanoid";
const endpoint = "https://tech-radar.documents.azure.com:443/";
const key =
  "nv5m4kP9efRdy69FoASbiJ3ERFqlzPTQXxNFm5xXpnh0NKrcUEmWxUnsNv1Y7sfHKPv6NOnml8WeACDbwBVxOQ==";
const client = new CosmosClient({ endpoint, key });

const { database } = await client.databases.createIfNotExists({
  id: "tech-radar",
});
console.log(database.id);

const { container } = await database.containers.createIfNotExists({
  id: "Items",
});

const technologies = [
  {
    id: nanoid(),
    name: "D3",
    quadrant: "tools",
    ring: "assess",
    link: "https://d3js.org/",
  },
  {
    id: nanoid(),
    name: "TypeScript",
    quadrant: "languages",
    ring: "trial",
    link: "https://www.typescriptlang.org/",
  },
  {
    id: nanoid(),
    name: "Storybook",
    quadrant: "tools",
    ring: "adopt",
    link: "https://storybook.js.org/",
  },
];

export async function fetchItems() {
  const { resources: items } = await container.items
    .query({
      query: "SELECT * FROM Items",
    })
    .fetchAll();
  return items;
}

export async function deleteTechnology({ id }: { id: string }) {
  return await container.item(id).delete();
}

export async function addItem({ id, name, quadrant, ring, link }: any) {
  console.log(id, name, quadrant, ring, link);
  return await container.items.create({ id, name, quadrant, ring, link });
}
