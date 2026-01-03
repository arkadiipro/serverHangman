const express = require("express");
const session = require("express-session");

const app = express();

app.use(express.json());
app.use(express.static("public"));

app.use(session({
  secret: "hangman-secret",
  resave: false,
  saveUninitialized: true
}));

let words = [
  "arkadii","love","zlata","and","brat","mark",
  "sun","moon","star","water","fire","earth",
  "air","house","tree","flower","book","pen",
  "desk","chair","computer","phone","music","road","car",
  "city","village","time","idea","joy","sadness",
  "truth","lie","good","evil","path","goal","dream",
  "work","rest","food","clothes","wind","night","morning",
  "evening","mountain","river","forest","field","bird","fish",
  "stone","sand","glass","iron"
];

function startGame(req) {
  const word = words[Math.floor(Math.random() * words.length)];

  req.session.game = {
    word,
    answerArray: Array(word.length).fill("_"),
    remainingLetters: word.length,
    attempts: 10
  };
}

app.post("/getword", (req, res) => {
  if (!req.session.game) {
    startGame(req);
  }

  const game = req.session.game;

  if (!req.body.key || req.body.key.length !== 1) {
    return res.json({
      word: game.answerArray.join(" "),
      attempts: game.attempts,
      alert: null,
      clear: false
    });
  }

  const guess = req.body.key.toLowerCase();
  let found = false;

  for (let i = 0; i < game.word.length; i++) {
    if (game.word[i] === guess && game.answerArray[i] === "_") {
      game.answerArray[i] = guess;
      game.remainingLetters--;
      found = true;
    }
  }

  if (!found) game.attempts--;

  // ПЕРЕМОГА
  if (game.remainingLetters === 0) {
    const response = {
      word: game.answerArray.join(" "),
      attempts: game.attempts,
      alert: `Слово було "${game.word}". Харош бро`,
      clear: true
    };
    startGame(req);
    return res.json(response);
  }

  // ПОРАЗКА
  if (game.attempts <= 0) {
    const response = {
      word: game.answerArray.join(" "),
      attempts: 0,
      alert: `Слово було "${game.word}". Ти не вгадав бро`,
      clear: true
    };
    startGame(req);
    return res.json(response);
  }

  res.json({
    word: game.answerArray.join(" "),
    attempts: game.attempts,
    alert: null,
    clear: false
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server started on http://localhost:" + PORT);
});

