const fs = require("fs");
const { NFTStorage, Blob } = require("nft.storage");

const client = new NFTStorage({
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDAxOTQwOTkwZmMxQjEyODZDNTBmOTFEMzBEYzQ3QjZFMDhmNDQwN0EiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY0MjMxMTE4MDc5NywibmFtZSI6Im5mdGJldCJ9.OYctdmwHCX5YmRHTHtlkWcagIe3MMsHlREVW25eOVX8",
});

let metadataUrl;

async function storeMetadata() {
  fs.readFile("scripts/logo.png", "utf-8", async (err, data) => {
    if (err) throw err;

    const metadataUrl = await store(data);
    console.log("Stored NFT successfully!\nMetadata URL: ", metadataUrl);
  });
}

async function store(data) {
  const fileCid = await client.storeBlob(new Blob([data]));
  const fileUrl = "https://ipfs.io/ipfs/" + fileCid;

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
