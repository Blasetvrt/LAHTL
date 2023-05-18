import * as fs from "fs";
import * as cheerio from "cheerio";
import translate from "translate";
import readline from "readline";

translate.engine = "deepl";
translate.key = "cd9fc105-c0d4-2dd2-e7a7-23aa998dfb70:fx";

function readFile() {
     const buffer = fs.readFileSync('input.html');
     const $ = cheerio.load(buffer.toString())

     $(".text, .select").each(async function (i, elem) {
          let tlText = await translate($(elem).text(), { from: "ja", to: "en" });
          $(elem).text(tlText);
     }, function () {
          console.log("FINISHED")
     });

     console.log("Stand by...")

     setTimeout(() => {
          let logger = fs.createWriteStream("../files/outputEN.html", {
               flags: "a" //append
          });
          logger.write($("html").html());

          const rl = readline.createInterface({
               input: process.stdin,
               output: process.stdout,
          });

          rl.question("Done! Exit? (Y/N)\n", (res) => {
               if (res != "Y" && res != "y")
                    readFile();
               else
                    process.exit(0);

               rl.close();
          });
     }, 5000);

}

readFile()