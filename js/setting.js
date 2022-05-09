import { Quiz } from "./quiz.js";
export class Settings {
  constructor() {
    this.category = document.getElementById("Categoryy");
    this.Diffeculty = document.getElementsByName("flexRadioDefault");
    this.Questions = document.getElementById("Questions");
    this.btnStart = document.getElementById("btn-start");
    this.Diffeculty = document.getElementsByName("flexRadioDefault");
    this.btnStart.addEventListener("click", this.calls.bind(this));
  }
  async calls() {
    this.cate = this.category.value;
    this.diff = Array.from(this.Diffeculty).filter(function (ele) {
      return ele.checked;
    })[0].value;

    this.num = this.Questions.value;

    this.fetch = await this.fetchUrl(this.num, this.cate, this.diff);
    if (this.fetch.length != 0) {
      $("#setting").fadeOut(300, () => $("#quiz").fadeIn(300));
    }
    new Quiz(this.fetch);
  }
  async fetchUrl(num, cate, diff) {
    let myHttp = await fetch(
      `https://opentdb.com/api.php?amount=${num}&category=${cate}&difficulty=${diff}`
    );
    let result = await myHttp.json();
    return result.results;
  }
}
