function sumaDos(){
    document.getElementById("chg").innerHTML = "";
    let cant = Number(document.querySelector("#cant").value);
    let num2 = 2;
    let total = cant + num2;
    document.getElementById("chg").value = total;
    console.log(total);
}


