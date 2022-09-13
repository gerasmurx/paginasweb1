function deteTrin(){
    let ladoA = Number(document.querySelector("#ladoA").value);
    let ladoB = Number(document.querySelector("#ladoB").value);
    let base = Number(document.querySelector("#base").value);

    if ((ladoA == ladoB) && (ladoA == base)){
        document.getElementById("resul").value = "Triangulo Equilatero";
    } else if (ladoA == ladoB){
        document.getElementById("resul").value = "Triangulo Isoseles";
    } else if (ladoA == base){
        document.getElementById("resul").value = "Triangulo Isoseles";
    } else if (ladoB == base){
        document.getElementById("resul").value = "Triangulo Isoseles"; 
    } else {
        document.getElementById("resul").value = "Triangulo Escaleno";
    }
    
}
