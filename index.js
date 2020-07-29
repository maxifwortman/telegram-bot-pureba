const { Telegraf } = require("telegraf");
//const puppeteer=require("puppeteer");

const bot = new Telegraf(BOT_TOKEN="1093840907:AAHd8jvFLeR0kgOVmHXoCDbw2xqgAYRGMWU");

let userId;
const url = ('https://www.dolar.blue/')
let oficial=[];
let blue=[];

bot.start(ctx => {
  userId=ctx.from.id;
  console.log(userId);
  //dolarValue=scrapeDollarValues(url);
  ctx.reply("Bienvenido! Elegi /dolar_blue, /dolar_oficial");
});
bot.help(ctx => ctx.reply("Send me a sticker"));
bot.hears("/dolar_oficial", ctx =>{
    console.log("oficial: "+oficial+"|| blue: "+blue);
    if (oficial['promedio']!=undefined || oficial['compra']!=undefined || oficial['venta']!=undefined){
        ctx.reply(`OFICIAL compra: ${oficial['compra']}$ venta: ${oficial['venta']}$ promedio: ${oficial['promedio']}$`);
    }else{
        ctx.reply("Aguarde un momento mientras se actualizan los valores");
    }
});
bot.hears("/dolar_blue", ctx =>{
    console.log("oficial: "+oficial+"|| blue: "+blue);
    if (blue['promedio']!=undefined || blue['compra']!=undefined || blue['venta']!=undefined){
        ctx.reply(`BLUE compra: ${blue['compra']}$ venta: ${blue['venta']}$ promedio: ${blue['promedio']}$`);
    }else{
        ctx.reply("Aguarde un momento mientras se actualizan los valoes");
    }
});
bot.hears("hi", ctx =>{
  console.log(ctx.from);
  ctx.reply("Hey there");
});

// define cron job
/*schedule.scheduleJob('* * * * *', function() {
  bot.sendMessage(userId, "message")
});*/

bot.launch();

//carga los datos del dolares
async function scrapeDollarValues(url){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    //precios oficial
    const [el]= await page.$x('/html/body/div/div[3]/div[2]/div/div/div[2]/div/div[1]/p');
    const txt = await el.getProperty('textContent');
    oficial['compra'] = await txt.jsonValue();

    const [el2]= await page.$x('/html/body/div/div[3]/div[2]/div/div/div[2]/div/div[2]/p');
    const txt1 = await el2.getProperty('textContent');
    oficial['venta'] = await txt1.jsonValue();

    const [el3]= await page.$x('/html/body/div/div[3]/div[2]/div/div/div[2]/div/div[3]/p');
    const txt2 = await el3.getProperty('textContent');
    oficial['promedio'] = await txt2.jsonValue();

    //precios blue
    const [el4]= await page.$x('/html/body/div/div[3]/div[1]/div/div/div[2]/div/div[1]/p');
    const txt3 = await el4.getProperty('textContent');
    blue['compra'] = await txt3.jsonValue();

    const [el5]= await page.$x('/html/body/div/div[3]/div[1]/div/div/div[2]/div/div[2]/p');
    const txt4 = await el5.getProperty('textContent');
    blue['venta'] = await txt4.jsonValue();

    const [el6]= await page.$x('/html/body/div/div[3]/div[1]/div/div/div[2]/div/div[3]/p');
    const txt5 = await el6.getProperty('textContent');
    blue['promedio'] = await txt5.jsonValue();
    
    browser.close();

}
