import express from 'express';
import exphbs from 'express-handlebars';
import fetch from 'isomorphic-fetch';

const app = express();

const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: '.handlebars'
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

const port = 3000;

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*" );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });


  app.get("/kural/count", (req, res) => {
    res.json(1330);
  });


  app.get("/kural/:num", async (req, res) => {
    
    let result = await fetch(`https://api-thirukkural.vercel.app/api?num=${req.params.num}`);
    let data = await result.json();

    res.render('index.handlebars', {
      number: data.number,
      chapter: data.eng_chap,
      verse: data.eng,
      explain: data.eng_exp
    });

  });






app.get("/kural", async function (req, res) {
  let quer = req.query;
  let start = quer.start;
  let page = start;
  let end = quer.end;
  let urls = [];
  let result = [];
  let i = 0;

   for (let i = start, j = 0; i <= end; i++, j++) {

      urls[j] = "https://api-thirukkural.vercel.app/api?num=" + page;
      page++;
    }

    try {
      result = await Promise.allSettled(
        urls.map(async (url) => {
          let test = await fetch(url);
          return test;
        })
      );
  } catch {
    console.log("Try Again");
  }


  const promises = result.map((resout) => {
    if (resout.status === "fulfilled") {
      return resout.value.json();
    }
    else{
      
    }
  });
  
  Promise.all(promises)
    .then((dataArray) => {

      res.json(dataArray);
    });



// Promise.all (result.map(async (resout) => {
//   if (resout.status === "fulfilled") {
//       return await resout.value.json();
//     }
//   })).then((dataArray) => {
//     res.json(dataArray);
//   });

});
app.listen(port, function () {
  console.log(`Kural app listening on port ${port}!`);
});
