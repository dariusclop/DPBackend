const http = require("http");
const express = require("express");
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });
const bodyParser = require('body-parser');
const firebaseService = require("./services/firebase");

const app = express();
const cors = require("cors");

app.use(cors());
app.use(bodyParser());

const singleUpload = upload.single('image');

app.get('/', function(req, res) {
  res.send('on localhost server');
})

app.post('/image/upload',  function(req, res) {
  singleUpload(req, res, function(err) {

    if (err) {
        return res.status(422).send({errors: [{title: 'File Upload Error', detail: err.message}] });
    }else{
        console.log(req.file);
        return res.send('image uploaded');
    }
})
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