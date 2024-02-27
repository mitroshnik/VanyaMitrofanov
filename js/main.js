
   
function подброситьМонетку() {
// Генерируем случайное число от 0 до 1
var случайноеЧисло = Math.random();

// Определяем орел или решка
var результат = случайноеЧисло < 0.5 ? "Орёл" : "Решка";
//alert(1);
// Выводим результат
document.getElementById("результат").innerText = "Результат: " + результат;

// Обновляем статистику
обновитьСтатистику(результат);
}



function обновитьСтатистику(результат) {
var статистика = JSON.parse(localStorage.getItem("статистика")) || { орёл: 0, решка: 0 };

// Увеличиваем соответствующий счетчик
статистика[результат.toLowerCase()]++;

// Обновляем локальное хранилище
localStorage.setItem("статистика", JSON.stringify(статистика));

// Выводим подсказку с вероятностью выпадения орла
var вероятностьОрла = (статистика["орёл"] / (статистика["орёл"] + статистика["решка"])) * 100;
document.getElementById("подсказка").innerText = "С какой вероятностью выпадет Орёл: " + вероятностьОрла.toFixed(2) + "%";
}













/*
function generateRandomData(size) {
const data = [];
for (let i = 0; i < size; i++) {
data.push(Math.floor(Math.random() * 100) + 1);
}
return data;
}
window.onload = () => {
const sampleSize = 1000;
const sampleData = generateRandomData(sampleSize);

// Подготовка данных для диаграммы
const labels = Array.from({ length: sampleSize }, (_, i) => i + 1);
const chartContainer = document.getElementById('myChart');

// Отрисовка диаграммы
sampleData.forEach((value, index) => {
let bar = document.createElement('div');

 bar.style.width = '20px';
bar.style.height = `${value}px`;
bar.style.backgroundColor = 'rgba(54, 162, 235, 0.2)';
bar.style.border = '1px solid rgba(54, 162, 235, 1)';
bar.style.marginRight = '5px'; 
chartContainer.append(bar);
});
}
*/



// Генерация случайной выборки
function generateRandomData() {
const data = [];
for (let i = 0; i < 1000; i++) {
data.push(Math.floor(Math.random() * 100) + 1);
}
return data;
}
window.onload = () => {
// Использование библиотеки для построения диаграммы (например, Chart.js)
const randomData = generateRandomData();
const chart = new Chart(document.getElementById('chart'), {
type: 'bar',
data: {
labels: Array.from({ length: 1000 }, (_, i) => i + 1),
datasets: [{
label: 'Случайная выборка',
data: randomData,
backgroundColor: 'rgba(54, 162, 235, 0.2)',
borderColor: 'rgba(54, 162, 235, 1)',
borderWidth: 1
}]
},
options: {
scales: {
y: {
beginAtZero: true
}
}
}
});
}












function calculateStatistics(input) {
    // Преобразование строки в массив чисел
    const numbers = input.split(',').map(Number);
    
    // Вычисление выборочной средней
    const mean = numbers.reduce((acc, val) => acc + val, 0) / numbers.length;
    
    // Вычисление медианы
    const sortedNumbers = numbers.sort((a, b) => a - b);
    const middleIndex = Math.floor(sortedNumbers.length / 2);
    const median = sortedNumbers.length % 2 === 0 ?
    (sortedNumbers[middleIndex - 1] + sortedNumbers[middleIndex]) / 2 :
    sortedNumbers[middleIndex];
    
    // Вычисление моды
    const modeMap = {};
    numbers.forEach(num => {
    modeMap[num] = (modeMap[num] || 0) + 1;
    });
    const modes = Object.keys(modeMap).filter(num => modeMap[num] === Math.max(...Object.values(modeMap)));
    
    // Вычисление минимума и максимума
    const min = Math.min(...numbers);
    const max = Math.max(...numbers);
    
    // Вычисление размаха
    const range = max - min;
    
    // Вычисление дисперсии
    const meanSquaredDifferences = numbers.map(num => Math.pow(num - mean, 2)).reduce((acc, val) => acc + val, 0);
    const variance = meanSquaredDifferences / numbers.length;
    
    return {
    mean: mean,
    median: median,
    mode: modes,
    min: min,
    max: max,
    range: range,
    variance: variance
    };
    }
    /*
    // Пример использования
    const inputNumbers = "1, 2, 3, 4, 5, 6, 7, 8, 9";
    const statistics = calculateStatistics(inputNumbers);
    console.log(statistics);
    */
function chisla() {
   let i =  document.getElementById("chisla");
   var j = calculateStatistics(i.value);
   console.log(j);
   document.getElementById("min").innerText = "минимальное:" + j.min;
   document.getElementById("max").innerText = "максимальное:" + j.max;
   document.getElementById("median").innerText = "медиана:" + j.median;
   document.getElementById("mode").innerText = "мода:" + j.mode;
   document.getElementById("range").innerText = "размах:" + j.range;
   document.getElementById("variance").innerText = "дисперсия:" + j.variance;
   document.getElementById("mean").innerText = "Выборочная средняя:" + j.mean;
}