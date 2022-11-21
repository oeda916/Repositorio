// Definición de botones

const consultaredo = document.getElementById('consultar');
const resetconsulta = document.getElementById('resetcons');

//Definicion de elemento de estado para mostrar informacion en pagina

const estadorepEl = document.getElementById('estado');

// Haciendo fetch de JSON local que simula base de datos "Con el estado actual de los soportes"
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
                estadorepEl.innerHTML = `<p>Numero de Soporte: ${statuses[NumaConsultar2].NumS}</p>
                <p>Tipo de equipo: ${statuses[NumaConsultar2].TipoEq}</p>
                <p>Fecha de inicio de trabajos: ${statuses[NumaConsultar2].FechaI}</p>
                <p>Fecha de ultima actualizacion: ${statuses[NumaConsultar2].FechaAct}</p>
                <p>Estado actual de trabajo: ${statuses[NumaConsultar2].EdoAct}</p>`;
            };
        }
        );
};

const resetearconsulta = () => {

    let hijos = estadorepEl.childElementCount;    

    if (hijos != 0) {
        for (i = 0 ; i < hijos ; i++){
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