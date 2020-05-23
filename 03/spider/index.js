const originRequest = require('request');
const cheerio = require('cheerio');
const iconv = require('iconv-lite');

function request(url, callback){
    const options = {
        url: url,
        encoding:null
    };
    originRequest(url, options, callback)
}

for(let i = 100557; i < 100562; i++) {
    console.log(3);
    
    const url =  `https://www.dy2018.com/i/${i}.html`;
    request(url, function(err, res, body){
        const html = iconv.decode(body, 'gb2312');
        const $ = cheerio.load(html)
        console.log($(".title_all h1").text());
        
    })
}