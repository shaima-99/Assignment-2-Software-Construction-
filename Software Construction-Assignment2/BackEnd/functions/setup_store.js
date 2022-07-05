const db = require("./database");

async function setupDatabase(req, res, next) {
  // To delete all the collections
  //const collections = ["user", "news", "product"];
  const collections = (await db.firestore.listCollections()).map(col=> col.id);
  console.log(collections);
  collections.forEach(async (collection) => {
    console.log("In Collection: "+collection);
    await deleteCollection(collection);
  });
  const collections1 = (await db.firestore.listCollections()).map(col=> col.id);
  // Add documents to the todos collection
  addDocuments("store", [
    { title: "A4 Paper (Red)", quantity: 2 },
    { title: "Eraser", quantity: 10 },
    { title: "Pelaka", quantity: 5 },
  ]);  
  res.send("Old Database: "+collections+"\n Clear Database: "+ collections1);
}

async function deleteCollection(collection) {
  const cref = db.firestore.collection(collection);
  console.log(collection);
  const docs = await cref.listDocuments();
  docs.forEach((doc) => doc.delete());
}

function addDocuments(collection, docs) {
  docs.forEach((doc) => db.create(collection, doc));
}

module.exports = setupDatabase;
