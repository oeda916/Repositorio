const consultaredo = document.getElementById('consultar');
const resetconsulta = document.getElementById('resetcons');


// Haciendo fetch de JSON local que simula base de datos "Con el estado actual de los soportes"
const realizarfetch = () => {
    
    fetch('assets/DatosSop.json')
    .then(response => response.json())
    .then(statuses => {
        
    let NumaConsultar = prompt('Ingrese su numero de soporte:','En el rango de 1 a '+statuses.length);
    let NumaConsultar2 = NumaConsultar-1;
    
    if (NumaConsultar < 1 || NumaConsultar > statuses.length || ((NumaConsultar-NumaConsultar)!= 0)) {

        alert('Numero de soporte incorrecto');

        // Opción para hacer necesaria la consulta de un numero de soporte valido.
        // realizarfetch();  
    
    } else {

        console.log(statuses[NumaConsultar2].TipoElectro)  

    }

})};

consultaredo.addEventListener('click', () => {
realizarfetch();
})

resetconsulta.addEventListener('click', () => {
console.clear();
alert('Placeholder');
})