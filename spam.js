import fetch from "node-fetch";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const faker = require("faker")
var names = require("./names.json");
var columnify = require('columnify');
const chalk = require('chalk');
 

let i = 0;

init();

async function init(){

    while (true) {
        i++;
    
        var rand = Math.floor((Math.random()*names.length)+1);
        var rand2 = Math.floor((Math.random()*names.length)+1);
        var rand3 = Math.floor((Math.random()*1000)+1);
    
        var name = faker.internet.userName();
        var pass = faker.internet.password(faker.datatype.number({min:8,max:16}));



        var res = await fetch("https://steamsourcetrade.xyz/auth.php", {
        "headers": {
            "accept": "*/*",
            "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            "sec-ch-ua": faker.internet.userAgent(),
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-requested-with": "XMLHttpRequest",
        },
        "referrer": "https://steamsourcetrade.xyz/lKgBOFGYgP/k5vair5h63/pdfbzo6pij?q=lKgBOFGYgP&s=1cd5c3dc01469b71292d6338dfdf818f",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": `doAuth=1&login=${name}&password=${pass}`,
        "method": "POST",
        "mode": "cors"
        });

        if (!res.ok) {

            var columns = columnify([{
                ERROR       : chalk.red("Error"),
                STATUS   : chalk.red(res.statusText + " : " + res.status),
                ERROR2     : chalk.red("Error")
                }],{
                minWidth:30,columnSplitter: ' | ',
            })
               
            console.log(columns);

            await sleep(5000);
        }
    
        var columns = columnify([{
            index      : i,
            name       : name,
            password   : pass,
            status     : chalk.green(res.statusText)
            }],{
            minWidth:30,columnSplitter: ' | '
        })
           
        console.log(columns);
    
        await sleep(180);
    }

}

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}