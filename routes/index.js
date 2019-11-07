var express = require('express');
var request = require('request') ///wrong - flag
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
    res.sendFile('index.html', { root: 'public' });
});

router.get('/findTicker', function(req, res, next) {
    console.log("In findTicker route");
    var myRe = new RegExp("^" + req.query.q);
    console.log(myRe);
    var fs = require('fs');
    fs.readFile(__dirname + '/stocks.dat.txt', function(err, data) {
        if (err) throw err;
        var stocks = data.toString().split("\n");
        var jsonresult = [];
        for (var i = 0; i < stocks.length; i++) {
            var result = stocks[i].search(myRe);
            if (result != -1) {
                console.log(stocks[i]);
                jsonresult.push({ stock: stocks[i] });
            }
        }
        console.log(jsonresult);
        res.status(200).json(jsonresult);
    });
});

router.get('/grabIncomeInfo', function(req, res, next) {
    console.log("In IncomebIncome route");
    const url = "https://financialmodelingprep.com/api/v3/financials/income-statement/" + req.query.q
    console.log(url);
    request(url).pipe(res);
});

router.get('/grabPriceInfo', function(req, res, next) {
    console.log("In grabPriceInfo route");
    const url = "https://financialmodelingprep.com/api/v3/stock/real-time-price/" + req.query.q
    console.log(url);
    request(url).pipe(res);

});

module.exports = router;
