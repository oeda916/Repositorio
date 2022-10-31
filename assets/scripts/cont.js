const nombre = document.querySelector('#nombre');
const apellido = document.querySelector('#apellido');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const form = document.querySelector('#form')

const emailRe = /^[a-zA-Z0-9\.-]+@[a-zA-Z0-9-]{2,}[.][a-zA-Z]{2,4}$/
const apellidoRe = /^[a-zA-Z]{3,16}$/
const passwordRe = /^[a-z0-9_-]{6,18}$/
const nombreRe = /^[a-zA-Z]{3,16}$/

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
const valorPassword = (passwordValue) => {
    if (passwordValue.trim()) {
        if (passwordRe.test(passwordValue)) {
            vectorValida.push('password')
            BD.push(passwordValue)
        }
    }
}
form.addEventListener('submit', (e) => {
    e.preventDefault()
    if (vectorValida.length == 4) {
        localStorage.setItem(`${BD[2]}`, JSON.stringify(BD))
        window.location.reload
    }
})



document.addEventListener('change', (e) => {
    e.target.matches('#nombre') ? valorNombre(e.target.value) : null
    e.target.matches('#apellido') ? valorApellido(e.target.value) : null
    e.target.matches('#email') ? valorEmail(e.target.value) : null
    e.target.matches('#password') ? valorPassword(e.target.value) : null
});