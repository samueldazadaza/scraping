const puppeteer = require('puppeteer');

//permite navegacion a traves de la web utilizando chromium
var date = Date.now() //extraer fecha actual en milisegndos
console.log(`Hora actual en segundos= ${Math.round( date / 1000)}`); // imprimir fecha en segundos actual
console.log(`Hora actual = ${date}`); // imprimir fecha en segundos actual

(async() => {
    const browser = await puppeteer.launch( {headless: false}); //ver lo que esta pasando en el navegador
    const page = await browser.newPage(); //crear pestaña en navegador

    await page.goto('https://wts.woden.com.co/wdrp');
    await page.screenshot({ path: '/src/img1.jpg' }) //para capturar pantalla

    await page.type('#login_UserName', 'samuel.daza');
    await page.type('#login_Password', 'Woden2019**');
    await page.screenshot({ path: '/src/img2.jpg' }) //para capturar pantalla

    await page.click('.boton button');
    //await page.waitForSelector('[href="/wdrp/"]')
    await page.waitForTimeout(2000); //esperar 2 segundos, para que cargue pagina
    await page.goto('https://wts.woden.com.co/wdrp/ODS/Ingreso?ods=2201&s=4');
    await page.screenshot({ path: '/src/img3.jpg' }) //para capturar pantalla

    await page.waitForSelector('#Serial1');
    const texto = await page.evaluate(() => document.querySelector('#Serial1').innerText);
    await page.waitForTimeout(300)
    console.log(texto);
    console.log("heloooooooooooooooooooo");

    await page.goto('https://wts.woden.com.co/wdrp/ODS/Ingreso?ods=2202&s=4');
    const title = await page.$('#Serial1');
    const info = await page.evaluate(el => el.textContent, title)  // EXTRAE INFO DE LA PAGINA
    
    console.log(info);



    await browser.close();
    console.log("😀navegacion realizada con exito😀😁😁🎄🎄")
}) ();