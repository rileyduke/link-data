const https = require('https');
const fs = require('fs');
var path = require('path');

const helper = require('./helper.js')

var api_url = 'https://hiring-ld-takehome.herokuapp.com/transactions';
var file_directory = './output/'
var file_path = './fallback.json'

function getRange(fromDate, toDate) {
    let url = new URL(api_url)
    url.searchParams.append('fromDate', fromDate)
    url.searchParams.append('toDate', toDate)

    let from = new Date(fromDate)
    let to = new Date(toDate)
    
    https.get(url, function (res) { 
        if (res.statusCode == 400) {
            // binary search until we can get some results

            return
        }
        // write the results

    });
}

if (!fs.existsSync(file_directory)){
    fs.mkdirSync(file_directory);
}
const now = new Date().getTime();
file_path = path.join(file_directory, now + ".json")

fs.writeFileSync(file_path, 'Date,Amount,Description');
getRange('2022-03-01', '2022-03-05')
