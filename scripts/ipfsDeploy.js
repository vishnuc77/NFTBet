const fs = require("fs");
const { NFTStorage, Blob } = require("nft.storage");

const client = new NFTStorage({
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDAxOTQwOTkwZmMxQjEyODZDNTBmOTFEMzBEYzQ3QjZFMDhmNDQwN0EiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY0MjMxMTE4MDc5NywibmFtZSI6Im5mdGJldCJ9.OYctdmwHCX5YmRHTHtlkWcagIe3MMsHlREVW25eOVX8",
});

let metadataUrl;

async function storeMetadata() {
  metadataUrl = await store();
  console.log("Stored NFT successfully!\nMetadata URL: ", metadataUrl);
}

async function store() {
  const fileUrl = "https://i.ibb.co/dmGjzRt/dice.jpg";

  const obj = {
    name: "NFTBet",
    description: "you are a winner of NFTBet",
    image: fileUrl,
  };

  const metadata = new Blob(JSON.stringify(obj), {
    type: "application/json",
  });
  const metadataCid = await client.storeBlob(metadata);
  const metadataUrl = "https://ipfs.io/ipfs/" + metadataCid;

  return metadataUrl;
}

(async () => {
  await storeMetadata();
})();
