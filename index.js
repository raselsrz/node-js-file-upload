const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = 3000;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'upload/');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

app.use(express.static(__dirname + '/public'));

//Route
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

//single file upload

// app.post('/upload', upload.single('file'), (req, res) => {
    
//     if (!req.file) {
//         return res.status(400).send('Please upload a file');
//     }
//     res.send('File uploaded successfully: ' + req.file.filename);
// });


//Multiple file upload
app.post('/upload', upload.array('file', 10), (req, res) => {
    if (!req.files) {
        return res.status(400).send('Please upload a file');
    }
    let result = `You have uploaded these files: <hr />`;
    const files = req.files;
    files.forEach(file => {
        result += `<b>File Name:</b> ${file.originalname} <br />`;
        result += `<b>File Size:</b> ${file.size} bytes <br />`;
        result += `<b>Mimetype:</b> ${file.mimetype} <br /><br />`;
    });
    res.send(result);
});



app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});