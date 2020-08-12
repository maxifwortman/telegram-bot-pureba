const { Telegraf } = require("telegraf");
const axios = require("axios");
const cheerio = require("cheerio");
//const puppeteer=require("puppeteer");
const cron = require("node-cron");

const bot = new Telegraf("1093840907:AAHd8jvFLeR0kgOVmHXoCDbw2xqgAYRGMWU");

const url = ('https://www.dolar.blue/')
const urlBtc = ('https://api-pub.bitfinex.com/v2/tickers?symbols=tBTCUSD')
let oficial=[];
let blue=[];
let btcPrice='';

cron.schedule("*/5 * * * * *", function() {
      console.log("running a task every 5 seconds");
});

bot.start(ctx => {
  ctx.reply("Bienvenido! Elegi /dolar_blue, /dolar_oficial o /btc");
});
bot.hears("/dolar_oficial", ctx =>{
    axios.get(url)
    .then(urlResponse=>{
        const $ = cheerio.load(urlResponse.data);
        $('p.price').each((i,element)=>{
            oficial.push($(element).html());
        })
    })
    .then(()=>{
        ctx.reply(`OFICIAL compra: ${oficial[0]}$ venta: ${oficial[1]}$ promedio: ${oficial[2]}$`);
        oficial=[];
    }).catch(()=>{
        ctx.reply(`Hubo un error al intentar obtener los valores`);
    });
});
bot.hears("/dolar_blue", ctx =>{
    axios.get(url)
    .then(urlResponse=>{
        const $ = cheerio.load(urlResponse.data);
        $('p.price-blue').each((i,element)=>{
            blue.push($(element).html());
        })
    })
    .then(()=>{
        ctx.reply(`BLUE compra: ${blue[0]}$ venta: ${blue[1]}$ promedio: ${blue[2]}$`);
        blue=[];
    }).catch(()=>{
        ctx.reply(`Hubo un error al intentar obtener los valores`);
    });
});
bot.hears("/btc", ctx =>{
    axios.get(urlBtc)
    .then(rawJsonBtc=>{
        console.log(rawJsonBtc.data[0][1]);
        btcPrice=rawJsonBtc.data[0][1];
    })
    .then(()=>{
        ctx.reply(`Bitcoin USD${btcPrice}$`);
        btcPrice='';
    }).catch(()=>{
        ctx.reply(`Hubo un error al intentar obtener los valores`);
    });
});

bot.launch();