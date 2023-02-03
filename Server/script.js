let expand = document.getElementById("expand");
let number = document.getElementById("number");
let chapter = document.getElementById("chapter");
let verse = document.getElementById("verse");
let explain = document.getElementById("explain");

main();

function main() {

  let kural = 1;

  getOne();

  async function getOne(){
    
    let result = await fetch(`http://localhost:3000/kural/${kural}`);
    let data;
    if(result.status == 200){
      data = await result.json();
      number.textContent = data.number;
      chapter.textContent = data.chap_eng;
      verse.textContent = data.eng;
      explain.textContent = data.eng_exp;
      
    }

  }
}