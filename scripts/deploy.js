const fs = require("fs");
const { NFTStorage, Blob } = require("nft.storage");

const client = new NFTStorage({
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDAxOTQwOTkwZmMxQjEyODZDNTBmOTFEMzBEYzQ3QjZFMDhmNDQwN0EiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY0MjMxMTE4MDc5NywibmFtZSI6Im5mdGJldCJ9.OYctdmwHCX5YmRHTHtlkWcagIe3MMsHlREVW25eOVX8",
});

async function storeMetadata() {
  fs.readFile("scripts/logo192.png", "utf-8", async (err, data) => {
    if (err) throw err;
    const url = await store(data);
    console.log("Stored NFT successfully!\nMetadata URL: ", url);
  });
}

async function store(data) {
  // (3)
  const fileCid = await client.storeBlob(new Blob([data]));
  const fileUrl = "https://ipfs.io/ipfs/" + fileCid;

  // (4)
  const obj = {
    name: "The Sample Text",
    information: "This is a sample text file.",
    creator: "Michelle Branagah",
    file_url: fileUrl,
  };

  // (5)
  const metadata = new Blob(JSON.stringify(obj), {
    type: "application/json",
  });
  const metadataCid = await client.storeBlob(metadata);
  const metadataUrl = "https://ipfs.io/ipfs/" + metadataCid;

  return metadataUrl;
}

storeMetadata();
