const admin = require("firebase-admin");
const serverKey = require("../serverKey.json")
const { Storage } = require('@google-cloud/storage');
const uuid = require("uuid");
const path = require("path");

const projectID = 'dp-proj-75928';

const options = {
  destination: 'kekw.jpg',
  metadata: {
      contentType: 'image/jpg',
      cacheControl: 'public, max-age=31536000',
      metadata: {
        firebaseStorageDownloadTokens: uuid.v4(),
      }
  }
};

admin.initializeApp({
  credential: admin.credential.cert(serverKey),
  databaseURL: "https://dp-proj-75928.firebaseio.com/"
});

var db = admin.database();
var idRef = db.ref("Ids");

const addImageId = async (inputId) => {
  idRef.push({
    imageId: inputId
  })
}

const storage = new Storage({
  projectId: projectID,
});

const bucket = storage.bucket('dp-proj-75928.appspot.com');

const uploadFile = async (inputImage) => {
  const inputImagePath = path.join(__dirname, "../" + inputImage);
  await bucket.upload(inputImagePath, options).then((response)=> {
    console.log("Image uploaded!");
  });
}

module.exports = {
  addImageId,
  uploadFile
}