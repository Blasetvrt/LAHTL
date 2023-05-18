import * as fs from "fs";
import * as cheerio from "cheerio";
import translate from "translate";

const buffer = fs.readFileSync('input.html');
const $ = cheerio.load(buffer.toString())

$(".text, .select").each(async function(i, elem) {
     let tlText = await translate($(elem).text(), { from: "ja", to: "en"});
     $(elem).text(tlText);
}, function() {
     console.log("FINISHED")
});

setTimeout(() => {
     let logger = fs.createWriteStream("../files/outputEN.html", {
          flags: "a" //append
      });
     logger.write($("html").html());
     console.log($("html").html())
}, 1000)





translate.engine = "deepl";
translate.key = "cd9fc105-c0d4-2dd2-e7a7-23aa998dfb70:fx";

