let express = require("express");
let fs = require("fs");
let path = require("path");
let bodyParser = require("body-parser")
let app = express();
let clientPath = path.join(__dirname, '../client');
let dataPath = path.join(__dirname, 'data.json');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//HTML when page loads: Working!
app.get('/', (req, res) => {
    res.sendFile(path.join(clientPath, 'index.html'));
});

//GET and POST methods: Working!
app.route('/api/chirps').get((req, res) => {
    res.sendFile(path.join(__dirname, 'data.json'));
}).post((req, res) => {
    fs.readFile(dataPath, (err, data) => {
        let chirps = JSON.parse(data);
        console.log(chirps);
        let incomingChirp = req.body;
        chirps.push(incomingChirp);
        let JSONChirps = JSON.stringify(chirps);
        fs.writeFile(dataPath, JSONChirps, function(err) {
            res.writeHead(201);
            res.end();
        });
    });
});

//Load all client pages: Working!
app.use(express.static(clientPath));

//Listening to port 3000: Working!
app.listen(3000, function(){ 
    console.log('Running...')
});