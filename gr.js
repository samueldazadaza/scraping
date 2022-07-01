const puppeteer = require('puppeteer');
// let patron = /(.*\.xlsx)/;

// const ficheros = require('fs');
  
//     var fs = require('fs');
//     fs.rename(`/Descargas/${patron}`, '/Downloads/archivo.xlsx', function(err) {
//         if ( err ) console.log('ERROR: ' + err);
//     });

//permite navegacion a traves de la web utilizando chromium
var date = Date.now() //extraer fecha actual en milisegndos
console.log(`Hora actual en segundos= ${Math.round( date / 1000)}`); // imprimir fecha en segundos actual
console.log(`Hora actual = ${date}`); // imprimir fecha en segundos actual

(async() => {
    const browser = await puppeteer.launch( {headless: false}); //ver lo que esta pasando en el navegador
    const page = await browser.newPage();
    await page.setViewport({ //tamaño de pantalla chromium
        width: 1920,
        height: 2000,
        deviceScaleFactor: 1,
      });

    await page.goto('http://rigel.greenmovil.com.co:8080/');
    await page.waitForTimeout(1000)
    await page.screenshot({ path: './gr1.jpg' }) //para capturar pantalla en la misma carpeta del proyecto

    await page.type('input[placeholder="Username"]', 'Sgiraldo'); //hacer login
    await page.type('input[placeholder="Password"]', 'giraldo2022');
    await page.click('button');
    await page.waitForSelector('[href="/mtto/clasificNovMtto/list.jsf"]') //espera que cargue href de "disponibilidad flota"
    //await page.waitForTimeout(2000); //esperar 2 segundos, para que cargue pagina

    await page.goto('http://rigel.greenmovil.com.co:8080/mtto/clasificNovMtto/list.jsf');
    await page.waitForSelector('[class="ui-selectcheckboxmenu-label-container"]') //espera que cargue "desplegable sistemas"
    await page.screenshot({ path: './gr2.jpg' }) //para capturar pantalla en la misma carpeta del proyecto
    console.log("disponibilidad de flota cargada");

    await page.click('[alt="excel"]') //espera que cargue "desplegable sistemas"
    console.log("😀navegacion realizada con exito😀😁😁🎄🎄")

    
    
    
    
    const texto = await page.evaluate(() => document.querySelector('#Serial1').innerText);
    await page.waitForTimeout(300)
    console.log(texto);

    await page.goto('https://wts.woden.com.co/wdrp/ODS/Ingreso?ods=2202&s=4');
    const title = await page.$('#Serial1');
    const info = await page.evaluate(el => el.textContent, title)  // EXTRAE INFO DE LA PAGINA
    
    console.log(info);



    await browser.close();
}) ();