import express from 'express';
import { handler as ssrHandler } from './dist/server/entry.mjs';
import axios from "axios";
import cheerio from "cheerio"

const app = express();
app.use(express.static('dist/client/'))
app.use(ssrHandler);

app.listen(8080);



export async function get() {
  const test = []
  await axios("https://www.theguardian.com/uk").then((response) => {
    const html = response.data;
    const $ = cheerio.load(html)
    $(".fc-item__title", html).each(function () {
      const title = $(this).text()
      const url = $(this).find("a").attr("href")
      test.push(url)
    })
  });

  console.log(test)
  return new Response(JSON.stringify({"hallo":test}), { status: 200 });
}