const https = require('https')
const fs = require('fs')
var path = require('path')

const helper = require('./helper.js')
const logg = require('./logg.js')

var api_url = 'https://hiring-ld-takehome.herokuapp.com/transactions';
var file_directory = './output/'
var file_path = './fallback.json'

function getRange(fromDate, toDate) {
    let from = new Date(fromDate)
    let to = new Date(toDate)
    if (helper.differenceInDays(from, to) < 1) {
        console.log("No difference in days")
        return
    }

    let url = new URL(api_url)
    url.searchParams.append('fromDate', fromDate)
    url.searchParams.append('toDate', toDate)
    
    var data = []
    https.get(url, function (res) { 
        // too many arguments status code
        if (res.statusCode == 400) {
            // binary search until we can get some results
            let diff = helper.differenceInDays(from, to)
            let midpoint = helper.addDays(from, diff / 2)
            let midpoint1 = helper.addDays(from, (diff / 2) + 1)
            getRange(fromDate, helper.dateToString(midpoint))
            getRange(helper.dateToString(midpoint1), toDate)
            return
        }

        // unknown status code
        if (res.statusCode != 200){
            return
        }

        // successfully got a response
        res.on('data', function(chunk) {
            data.push(chunk);
        }).on('end', function() {
            var events = JSON.parse(Buffer.concat(data));
            events.data.forEach(x => {
                fs.appendFileSync(file_path, "\n")
                fs.appendFileSync(file_path, helper.recordToCsv(x))
            });

            logg.info("from: " + fromDate + ", to: " + toDate + " (" + helper.differenceInDays(from, to) + ")")
        });
    });
}

if (!fs.existsSync(file_directory)){
    fs.mkdirSync(file_directory);
}
const now = new Date().getTime();
file_path = path.join(file_directory, now + ".json")

fs.writeFileSync(file_path, 'Date,Amount,Description');
getRange('2022-01-01', '2022-05-05')
