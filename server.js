const http = require("http");
const express = require("express");
const firebaseService = require("./services/firebase");

const app = express();

app.get('/', function(req, res) {
  res.send('on localhost server');
})

app.post('/image/upload', function(req, res) {
  //firebaseService.uploadFile();
  res.send('image upload');
})

app.post('/imageId/insert', function(req, res) {
  //firebaseService.addImageId();
  res.send('id inserted');
})

const httpServer = http.createServer(app);

const PORT = process.env.PORT || 3000;

httpServer.listen(3000, () => {
  console.log(`Server is listening on port ${PORT}`);
});