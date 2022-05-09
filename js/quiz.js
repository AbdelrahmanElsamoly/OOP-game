export class Quiz {
  constructor(questions) {
    this.questions = questions;
    this.index = 0;
    this.score = 0;
    this.currentQues = 1;
    this.numQues = this.questions.length;
    this.userChecked = document.getElementsByName("answers");
    this.btnSub = document.getElementById("submit");

    this.btnSub.addEventListener("click", this.checkAnswer.bind(this));
    this.tryBtn = document.getElementById("tryBtn");
    this.tryBtn.addEventListener("click", this.tryAgain.bind(this));
    this.showQuestion();
    this.Questions = document.getElementById("Questions");
  }
  showQuestion() {
    let current = `<button
    class="btn btn-warning position-absolute"
    style="right: 5px"
  >
    ${this.currentQues} Of ${this.numQues} question
  </button>`;
    document.getElementById("question").style.fontWeight = "bolder";
    document.getElementById("question").innerHTML =
      this.questions[this.index].question;
    document.getElementById("current").innerHTML = current;
    this.answer();
  }
  answer() {
    this.answers = [
      this.questions[this.index].correct_answer,
      ...this.questions[this.index].incorrect_answers,
    ];
    let currentIndex = this.answers.length,
      randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [this.answers[currentIndex], this.answers[randomIndex]] = [
        this.answers[randomIndex],
        this.answers[currentIndex],
      ];
    }

    let cartoona = ``;
    for (let i = 0; i < this.answers.length; i++) {
      cartoona += `
      <div> <input class="form-check-input" type="radio" name="answers" value="${this.answers[i]}" id="answers" >
      <label class="form-check-label" for="answers">
        ${this.answers[i]}
      </label></div>
     `;
    }
    document.getElementById("userAnswer").innerHTML = cartoona;
  }
  checkAnswer() {
    this.user = [...this.userChecked].filter(function (ele) {
      return ele.checked;
    })[0].value;
    let correct_answer = this.questions[this.index].correct_answer;
    if (this.user == correct_answer) {
      this.score++;
      $("#correct").fadeIn(500, function () {
        $("#correct").fadeOut(500);
      });
    } else {
      $("#incorrect").fadeIn(500, () => $("#incorrect").fadeOut(500));
    }

    this.nextQuestion();
    this.showScore();
  }

  nextQuestion() {
    this.index++;
    this.currentQues++;

    if (this.index < this.numQues) {
      this.showQuestion();
    } else {
      $("#quiz").fadeOut(500, function () {
        $("#scorePage").fadeIn(500);
      });
    }
  }
  showScore() {
    document.getElementById("score").innerHTML = this.score;
  }
  tryAgain() {
    $("#scorePage").fadeOut(500, () => {
      $("#setting").fadeIn(500);
    });
    this.Questions.value = "";
  }
}
