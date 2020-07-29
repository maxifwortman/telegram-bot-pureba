const { Telegraf } = require("telegraf");
const axios = require("axios");
const cheerio = require("cheerio");
//const puppeteer=require("puppeteer");

const bot = new Telegraf(process.env.BOT_TOKEN);

let userId;
const url = ('https://www.dolar.blue/')
let oficial=[];
let blue=[];

bot.start(ctx => {
  userId=ctx.from.id;
  console.log(userId);
  //scrapeDollarValues(url);
  ctx.reply("Bienvenido! Elegi /dolar_blue o /dolar_oficial");
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

bot.launch();