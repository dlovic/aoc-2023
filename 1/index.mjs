import fs from 'fs';

const dataRows = fs.readFileSync('./1/input.txt', 'utf8').split('\r\n');

const numbers = [];
dataRows.forEach(row => {
    let rowNumbers = row.split('');
    numbers.push(Number(rowNumbers.find(x => !isNaN(x)) + rowNumbers.reverse().find(x => !isNaN(x))));
});



console.log(numbers.reduce((a, b) => a + b, 0));