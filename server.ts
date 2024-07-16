/**
* @returns { 
*   title: "Espelho de Ponto",
*   empresa: string,
*   cnpj: string,
*   empregado: string,
*   admissao: string,
*   departamento: string,
*   funcao: string,
*   'jornada(s) periodo:': string 
* }
*/

import fs from 'fs';
import pdf from 'pdf-parse';

let dataBuffer = fs.readFileSync('ponto.pdf');

pdf(dataBuffer).then(function (data) {
  const { text } = data;
  const rawLines = text.trim().split('\n');
  const trimLines = rawLines.map((line) => line.trim());
  const content = trimLines.filter((line) => !line.includes('Pagina'));

  const object: Record<string, string> = {};

  for (let i = 0; i < content.length; i++) {
    if (i == 0) object.title = content[0];
    else if (content[i].includes(':')) {
      const key = content[i]
        .replace(':', '')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase();
      object[key] = content[i + 1];
    }
  }

  console.log(object);
});
