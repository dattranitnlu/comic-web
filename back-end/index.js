const express = require('express');
const fs = require('fs');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const multer = require('multer');
const cors = require('cors');
const {ErrorResult} = require('./utils/base_response');
var sto = require('node-persist');

app.use(cors({
    methods: ['OPTIONS', 'GET', 'POST', 'PUT', 'PATCH', 'DELETE']
}));

// const auth = require('./middleware/auth');
// app.use(auth);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('public'));
app.use('/uploads', express.static(__dirname + '/Uploads'));

var option = {
    dir : "mydata",
    ttl :10000
  }
  sto.init(option);

const DIR = './uploads';
let image ;
let imgUrl;
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, DIR);
    },
    filename: (req, file, cb) => {
      image = file.fieldname + '-' + Date.now() + '.' + path.extname(file.originalname) + "";
      cb(null, image);
      imgUrl = image;
      sto.setItemSync('img', imgUrl);      
      console.log("file Name:" + imgUrl);
      //console.log("filename: " + filename);
    }    
});
let upload = multer({storage: storage});
app.get('/upload', function (req, res){
  res.send();
})

app.get('/api', function (req, res) {
    res.end('file catcher example');
  });

app.post('/api/upload',upload.single('photo'), function (req, res) {
    console.log('nyujhjhjh');
    
    if (!req.file) {
        console.log("No file received");
        return res.send({
         
          success: false
        });
    
      } else {
        console.log('file received');
        res.set('link', imgUrl);
        return res.send({
          link: imgUrl,
          success: true
        })
      }
});


const userCtrl = require('./controllers/users');
app.use('/users', userCtrl);

const storyTypeCtrl = require('./controllers/story-types');
app.use('/storytypes', storyTypeCtrl);

const storyCtrl = require('./controllers/stories');
app.use('/stories', storyCtrl);

const chapterCtrl = require('./controllers/chapters');
app.use('/chapters', chapterCtrl);

const chapterContentCtrl = require('./controllers/chapter-contents');
app.use('/chapter-content', chapterContentCtrl);

const purchasedchapterCtrl = require('./controllers/purchased-chapters');
app.use('/purcharsed-chapter', purchasedchapterCtrl);

const paymentCtrl = require('./controllers/payment');
app.use('/payment', paymentCtrl);

const transactionHistoryCtrl = require('./controllers/transaction-historys');
app.use('/transaction-historys', transactionHistoryCtrl);

const send = require('./controllers/mailer');
app.use('/send', send);

app.use((req, res) => {
    res.status(404).json(ErrorResult(404, 'API not found!'));
});

const server = app.listen(3000, () => {
    const host = server.address().address;
    const port = server.address().port;
    console.log('Server is running at http://%s:%s', host, port);
});