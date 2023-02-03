// import _fetch from 'isomorphic-fetch';
import { myFetch } from "./myfetch.js";

let btnn = document.getElementById("next");
let btnp = document.getElementById("previous");
let loader = document.getElementById("loader");
let expand = document.getElementById("expand");
let number = document.getElementById("number");
let chapter = document.getElementById("chapter");
let verse = document.getElementById("verse");
let explain = document.getElementById("explain");
let pageno = document.getElementById("pageno");
let content = document.getElementById("content");

let list = document.createElement("ol");
content.appendChild(list);

main();

function main() {

  let count = 0;
  let kural = 1;
  let start = 1;
  let end = 10;
  let page = start;

  getData();
  btnn.addEventListener("click", getData);
  btnp.addEventListener("click", getData);

  async function getCount() {

    count = await (await fetch(`http://localhost:3000/kural/count`)).json();

  }

  async function getData() {
    loader.hidden = true;
    content.hidden = false;
    btnn.hidden = false;
    btnp.hidden = false;
    let li;
    let urls = [];
    let result;
    
    list.innerHTML = "";

    if (this == btnn) {
      start += 10;
      end += 10;
      page = start;
    } else if (this == btnp) {
      start -= 10;
      end -= 10;
      page = start;
    }
    if (start < 10) {
      btnp.hidden = true;
    }

    loader.hidden = false;
    content.hidden = true;

    list.start = start;
    
    let fetchobj = new myFetch(
      `http://localhost:3000/kural?start=${start}&end=${end}`
    );
    fetchobj.get()
      .then(async(res) => {
        res.forEach((rest) => {
          if (rest.status == "rejected") {
            btnn.hidden = true;
            return;
          }

          let item = document.createElement('li');
          item.innerHTML = `<a target="_blank" href="http://localhost:3000/kural/${rest.number}">${rest.eng}</a>`
          list.appendChild(item);

        });
        loader.hidden = true;
        content.hidden = false;
      })
      .catch((err) => console.log(err));
  }
}
