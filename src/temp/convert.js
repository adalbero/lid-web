const fs = require("fs");
const readLine = require("readline");
const { transform } = require("typescript");

main();

function main() {
  console.log("BEGIN");

  const rd = readLine.createInterface({
    input: fs.createReadStream("questions.csv"),
    console: false,
  });

  const qtd = 1000;

  fd = fs.createWriteStream(`out-${qtd}.txt`);
  let n = 0;
  rd.on("line", (line) => {
    if (n > 0 && n <= qtd) {
      let result = transform(line);
      fd.write(result);
    }
    n++;
  });

  const transform = (line) => {
    const vet = line.split(";");
    let i=0;

    let result = `
    {
      num: "${vet[i++]}",
      question: "${vet[i++]}",
      a: "${vet[i++]}",
      b: "${vet[i++]}",
      c: "${vet[i++]}",
      d: "${vet[i++]}",
      solution: "${vet[i++]}",
      area_code: "${vet[i++]}",
      area: "${vet[i++]}",
      theme: "${vet[i++]}",
      image: "${vet[i++]}"
    },`;
  
    return result
}

}
