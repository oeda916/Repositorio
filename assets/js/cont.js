var llavepub = work_around.llave_pub;

function valida_envia() {

    if (document.formulario.nombre.value.length == 0) {
        alert("Por favor escriba su nombre");
        document.formulario.nombre.focus();
        return 0;
    };

    if (document.formulario.apellido.value.length == 0) {
        alert("Por favor escriba su apellido");
        document.formulario.apellido.focus();
        return 0;
    };

    if (document.formulario.email.value.length == 0) {
        alert("Escriba su correo de contacto");
        document.formulario.email.focus();
        return 0;
    };

    if (document.formulario.contacto.value.length == 0) {
        alert("Escriba su mensaje de consulta para avanzar");
        document.formulario.contacto.focus();
        return 0;
    };

}

const nombre = document.querySelector('#nombre');
const apellido = document.querySelector('#apellido');
const email = document.querySelector('#email');
const contacto = document.querySelector('#contacto');
const form = document.querySelector('#form');

const nombreRe = /^[A-zÀ-ÿ\s]{3,25}$/;
const apellidoRe = /^[A-zÀ-ÿ\s]{3,25}$/;
const emailRe = /^[a-zA-Z0-9\.-\s]+@[a-zA-Z0-9-]{2,}[.][a-zA-Z\s]{2,4}$/;
const contactoRe = /([\s\S]){5,500}/;

const vectorValida = [];
const BD = [];

const valorNombre = (nombreValue) => {
    if (nombreValue.trim()) {
        if (nombreRe.test(nombreValue)) {
            vectorValida.push('nombre');
            BD.push(nombreValue);
        };
    };
};

const valorApellido = (apellidoValue) => {
    if (apellidoValue.trim()) {
        if (apellidoRe.test(apellidoValue)) {
            vectorValida.push('apellido');
            BD.push(apellidoValue);
        };
    };
};

const valorEmail = (emailValue) => {
    if (emailValue.trim()) {
        if (emailRe.test(emailValue)) {
            vectorValida.push('email');
            BD.push(emailValue);
        };
    };
};

const valorContacto = (contactoValue) => {
    if (contactoValue.trim()) {
        if (contactoRe.test(contactoValue)) {
            vectorValida.push('contacto');
            BD.push(contactoValue);
        };
    };
};

form.addEventListener('submit', (e) => {
    e.preventDefault()
    if (vectorValida.length == 4) {
        localStorage.setItem(`${BD[2]}`, JSON.stringify(BD));
        window.location.reload;
        alert("Gracias por contactarnos");
    };
}
);



document.addEventListener('change', (e) => {
    e.target.matches('#nombre') ? valorNombre(e.target.value) : null;
    e.target.matches('#apellido') ? valorApellido(e.target.value) : null;
    e.target.matches('#email') ? valorEmail(e.target.value) : null;
    e.target.matches('#contacto') ? valorContacto(e.target.value) : null;
}
);


// Documentación de API de clima se puede conseguir en: https://openweathermap.org/forecast5
// Argumentos Utilizados : Coordenadas, Unidades metricas, Maximo 12 posiciones de request, lenguaje en español y usagekey al ser una api gratuita pero con limite de requests.
// Se tuvo que utilizar un pequeño work around ya que es mala practica tener una key privada expuesta en un repositorio. 
// Permite "ocultar" el ID o KEY de la API solo parrafo que no sea tan flagrante la exposición aunque la manera correcta es hacer un proxy con un servidor local donde no se pueda
// Obtener por dev tools exactamente hacia donde se hace el requerimiento de red. 

addEventListener('DOMContentLoaded', () => {

    async function fetchClimaApi() {
        const response = await fetch('https://api.openweathermap.org/data/2.5/forecast?lat=-34.5455513&lon=-58.471045&lang=es&cnt=12&units=metric&appid=' + llavepub);
        const ClimaApi = await response.json();
        console.log(response.status);
        console.log(response.ok);
        for (i = 0; i < ClimaApi.list.length; i++) {
            const { list: { [i]: { main: { temp, feels_like, humidity }, weather: { 0: { description } }, pop, dt } } } = ClimaApi;
            var FechaArg = (new Date((dt) * 1000)).toLocaleString('es-ar', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });
            const parrafo = document.createElement('p');
            parrafo.className = 'cajaclima_' + (i + 1);
            const node1 = document.createTextNode('Estado general: ' + (description.charAt(0).toUpperCase() + description.slice(1)));
            const node1_1 = document.createElement('br');
            const node2 = document.createTextNode('Temperatura: ' + temp + '°C');
            const node2_1 = document.createElement('br');
            const node3 = document.createTextNode('Sensación Termica: ' + feels_like + '°C');
            const node3_1 = document.createElement('br');
            const node4 = document.createTextNode('Probabilidades de Lluvia: ' + (pop * 100) + '%');
            const node4_1 = document.createElement('br');
            const node5 = document.createTextNode('Porcentaje de Humedad: ' + humidity + '%');
            const node5_1 = document.createElement('br');
            const node6 = document.createTextNode('Dia y hora: ' + FechaArg);
            parrafo.appendChild(node1);
            parrafo.appendChild(node1_1);
            parrafo.appendChild(node2);
            parrafo.appendChild(node2_1);
            parrafo.appendChild(node3);
            parrafo.appendChild(node3_1);
            parrafo.appendChild(node4);
            parrafo.appendChild(node4_1);
            parrafo.appendChild(node5);
            parrafo.appendChild(node5_1);
            parrafo.appendChild(node6);
            const seccionclima = document.getElementById('climasec');
            seccionclima.appendChild(parrafo);
        };
        return;
    };

    fetchClimaApi();

});
