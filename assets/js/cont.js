function valida_envia() {

    if (document.formulario.nombre.value.length == 0) {
        alert("Por favor escriba su nombre")
        document.formulario.nombre.focus()
        return 0;
    }

    if (document.formulario.apellido.value.length == 0) {
        alert("Por favor escriba su apellido")
        document.formulario.apellido.focus()
        return 0;
    }

    if (document.formulario.email.value.length == 0) {
        alert("Escriba su correo de contacto")
        document.formulario.email.focus()
        return 0;
    }
    if (document.formulario.contacto.value.length == 0) {
        alert("Escriba su mensaje de consulta para avanzar")
        document.formulario.contacto.focus()
        return 0;
    }
}

const nombre = document.querySelector('#nombre');
const apellido = document.querySelector('#apellido');
const email = document.querySelector('#email');
const contacto = document.querySelector('#contacto');
const form = document.querySelector('#form')

const emailRe = /^[a-zA-Z0-9\.-]+@[a-zA-Z0-9-]{2,}[.][a-zA-Z]{2,4}$/
const apellidoRe = /^[a-zA-Z]{3,25}$/
const contactoRe = /^[a-zA-Z0-9-_]{1,10000}$/
const nombreRe = /^[a-zA-Z]{3,25}$/

const vectorValida = []
const BD = []


const valorNombre = (nombreValue) => {
    if (nombreValue.trim()) {
        if (nombreRe.test(nombreValue)) {
            vectorValida.push('nombre')
            BD.push(nombreValue)
        }
    }
}

const valorApellido = (apellidoValue) => {
    if (apellidoValue.trim()) {
        if (apellidoRe.test(apellidoValue)) {
            vectorValida.push('apellido')
            BD.push(apellidoValue)
        }
    }
}
const valorEmail = (emailValue) => {
    if (emailValue.trim()) {
        if (emailRe.test(emailValue)) {
            vectorValida.push('email')
            BD.push(emailValue)
        }
    }
}
const valorContacto = (contactoValue) => {
    if (contactoValue.trim()) {
        if (contactoRe.test(contactoValue)) {
            vectorValida.push('contacto')
            BD.push(contactoValue)
        }
    }
}
form.addEventListener('submit', (e) => {
    e.preventDefault()
    if (vectorValida.length == 4) {
        localStorage.setItem(`${BD[2]}`, JSON.stringify(BD))
        window.location.reload
        alert("Gracias por contactarnos")
    }
})



document.addEventListener('change', (e) => {
    e.target.matches('#nombre') ? valorNombre(e.target.value) : null
    e.target.matches('#apellido') ? valorApellido(e.target.value) : null
    e.target.matches('#email') ? valorEmail(e.target.value) : null
    e.target.matches('#contacto') ? valorContacto(e.target.value) : null
})


addEventListener('DOMContentLoaded', () => {

    async function fetchClimaApi() {
        const response = await fetch('https://api.openweathermap.org/data/2.5/forecast?lat=-34.5455513&lon=-58.471045&lang=es&cnt=12&units=metric&appid=650cfc6f64b445184b62f512f2bb7d30');
        const ClimaApi = await response.json();
        console.log(response.status);
        console.log(response.ok);
        console.log(ClimaApi);
        for (i = 0; i < ClimaApi.list.length; i++) {
            const { list: { [i]: { main : {temp,feels_like,humidity}, weather: { 0: { description } }, pop, dt } } } = ClimaApi;
            var FechaArg = (new Date((dt) * 1000)).toLocaleString('es-ar', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });
            const para = document.createElement('p');
            para.className = 'cajaclima_'+(i+1);
            const node = document.createTextNode((description.charAt(0).toUpperCase()+description.slice(1))+ ' - Probabilidades de Lluvia = '+ (pop * 100)+'% - '+ 'Fecha y hora: ' +FechaArg);
            para.appendChild(node);
            const element = document.getElementById('climadiv');
            element.appendChild(para);
            console.log(temp, feels_like, humidity, description, 'Probabilidades de Lluvia', (pop * 100), '%', FechaArg);
        };
        return;
    };

    fetchClimaApi();

});

