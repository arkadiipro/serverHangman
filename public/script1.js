let page = document;
let word = document.getElementById("word1")
let canvas = document.getElementById("canvas")
canvas.style.border = "1px solid red"
canvas.width = 600 
canvas.height = 600
let ctx = canvas.getContext("2d")
let width = canvas.width;
if (window.innerWidth < width ) {
  width = window.innerWidth
}
function getChel(attempts){
  let x = width / 100
     if (attempts === 10){
     } else if (attempts === 9 ){
         ctx.fillRect(18 * x,10 * x,4 * x,30 * x)
     } else if (attempts === 8 ){
         ctx.fillRect(48 * x,10 * x,4 * x,30 * x)
     } else if (attempts === 7 ){
         ctx.fillRect(20 * x,8 * x,30 * x,4 * x)
     } else if (attempts === 6 ){
         ctx.fillRect(20 * x,38 * x,30 * x,4 * x)
     } else if (attempts === 5 ){
         ctx.fillRect(33 * x,40 * x,4 * x,30 * x)
     } else if (attempts === 4 ){
         ctx.lineWidth = 4 * x
         ctx.beginPath()
         ctx.moveTo(35 * x,50 * x)
         ctx.lineTo(10 * x,70 * x)
         ctx.stroke()
     } else if (attempts === 3 ){
         ctx.lineWidth = 4 * x
         ctx.beginPath()
         ctx.moveTo(35 * x,50 * x)
         ctx.lineTo(60 * x,70 * x)
         ctx.stroke()
     } else if (attempts === 2 ){
         ctx.lineWidth = 4 * x
         ctx.beginPath()
         ctx.moveTo(35 * x,70 * x)
         ctx.lineTo(20 * x,90 * x)
         ctx.stroke()
     } else if (attempts === 1 ){
         ctx.lineWidth = 4 * x
         ctx.beginPath()
         ctx.moveTo(35 * x,70 * x)
         ctx.lineTo(50 * x,90 * x)
         ctx.stroke()
     } else if (attempts === 0 ){
       ctx.clearRect(0,0,canvas.width,canvas.height)
     }
}
page.addEventListener("keydown", async (event) => {
  try {
    // 1. Надсилаємо запит і чекаємо на відповідь (пакунок)
    const response = await fetch("/getword", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key: event.key })
    });

    // 2. ПРИЙМАЄМО ТА РОЗПАКОВУЄМО ОБ'ЄКТ
    // Метод .json() перетворює текст від сервера назад у об'єкт JS
    const data = await response.json();
    getChel(data.attempts)
    word.innerText = data.word;
    if (data.clear === true) {
      ctx.clearRect(0,0,canvas.width,canvas.height)
    }
    if (data.alert === null) {

    } else {
      alert(data.alert)
    }
    // 3. Тепер ви можете звертатися до властивостей об'єкта
    console.log(data.word);     // Виведе: "S _ N"
    console.log(data.attempts); // Виведе: 5
    console.log(data.alert);  // Виведе: "Правильно!"

    // Приклад: вивести слово на екран
    document.getElementById("word1").innerText = data.word;

  } catch (error) {
    console.error("Помилка:", error);
  }
});

