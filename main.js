const fs = require('fs');
const xml2js = require('xml2js');
const parser = new xml2js.Parser();

fs.readFile('sitemap.xml', (err, data) => {
  parser.parseString(data, (err, result) => {
    const urls = result.urlset.url.map((item) => item.loc[0]);
    console.log('Bulunan URL’ler:', urls);
    fs.writeFileSync('urls.txt', urls.join('\n'));
  });
});