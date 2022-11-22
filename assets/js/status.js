// Definición de botones

const consultaredo = document.getElementById('consultar');
const resetconsulta = document.getElementById('resetcons');

//Definicion de elemento de estado para mostrar informacion en pagina

const estadorepEl = document.getElementById('estado');

// Haciendo fetch de JSON local artificial que simularia base de datos "Con el estado actual de los soportes"
// Definiendo codigo para realizar y reiniciar consulta

const realizarconsulta = () => {

    fetch('assets/DatosSop.json')
        .then(response => response.json())
        .then(statuses => {

            let NumaConsultar = prompt('Ingrese su numero de soporte:', 'En el rango de 1 a ' + statuses.length);
            let NumaConsultar2 = NumaConsultar - 1;

            if (NumaConsultar < 1 || NumaConsultar > statuses.length || ((NumaConsultar - NumaConsultar) != 0)) {
                alert('Numero de soporte incorrecto');
                // Opción para hacer necesaria la consulta de un numero de soporte valido.
                // realizarconsulta();  
            }

            else {
                for (i=0; i < 1 ;i++) {
                    console.log((statuses[NumaConsultar2].TipoEq));
                };
                let rutaimg = ["aireacond","cocina","heladera","lavarropas","televisor"];
                estadorepEl.innerHTML = `<p>Numero de Soporte: ${statuses[NumaConsultar2].NumS}</p>
                <p class = "TiEeqq" >Tipo de equipo: ${statuses[NumaConsultar2].TipoEq}</p>
                <p class = "Ffechii" >Fecha de inicio de trabajos: ${statuses[NumaConsultar2].FechaI}</p>
                <p class = "Ffechaa" >Fecha de ultima actualizacion: ${statuses[NumaConsultar2].FechaAct}</p>
                <p class = "Eeact" >Estado actual de trabajo: ${statuses[NumaConsultar2].EdoAct}</p>
                <img src="assets/img/${rutaimg[statuses[NumaConsultar2].IdTipE]}.jpg" alt = "${statuses[NumaConsultar2].TipoEq}" id = "ImagenRp" >`;
            };
        }
        );
};


//Se resetea HTML con una funcion remove de hijos del elemento Div donde fueron creados los parrafos

const resetearconsulta = () => {

    let hijos = estadorepEl.childElementCount;

    if (hijos != 0) {
        for (i = 0; i < hijos; i++) {
            let eliminar = estadorepEl.firstElementChild;
            eliminar.remove();
        }
    };
};

// Event listeners para ambos botones disponibles en pagina

consultaredo.addEventListener('click', () => {
    resetearconsulta();
    realizarconsulta();
});

resetconsulta.addEventListener('click', () => {
    resetearconsulta();
});