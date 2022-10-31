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

const nombre=document.querySelector('#nombre');
const apellido=document.querySelector('#apellido');
const email=document.querySelector('#email');
const contacto=document.querySelector('#contacto');
const form=document.querySelector('#form')

const emailRe=/^[a-zA-Z0-9\.-]+@[a-zA-Z0-9-]{2,}[.][a-zA-Z]{2,4}$/
const apellidoRe=/^[a-zA-Z]{3,25}$/
const contactoRe=/^[a-zA-Z0-9-_]{1,10000}$/
const nombreRe=/^[a-zA-Z]{3,25}$/

const vectorValida=[]
const BD=[]


const valorNombre=(nombreValue)=>{
    if(nombreValue.trim()){
        if(nombreRe.test(nombreValue)){
            vectorValida.push('nombre')
            BD.push(nombreValue)
        }
    }
}

const valorApellido=(apellidoValue)=>{
    if(apellidoValue.trim()){
        if(apellidoRe.test(apellidoValue)){
            vectorValida.push('apellido')
            BD.push(apellidoValue)
        }
    }
}
const valorEmail=(emailValue)=>{
    if(emailValue.trim()){
        if(emailRe.test(emailValue)){
            vectorValida.push('email')
            BD.push(emailValue)
        }
    }
}
const valorContacto=(contactoValue)=>{
    if(contactoValue.trim()){
        if(contactoRe.test(contactoValue)){
            vectorValida.push('contacto')
            BD.push(contactoValue)
        }
    }
}
form.addEventListener('submit',(e)=>{
    e.preventDefault()
    if(vectorValida.length==4){
        localStorage.setItem(`${BD[2]}`,JSON.stringify(BD))
        window.location.reload
    }
})



document.addEventListener('change',(e)=>{
    e.target.matches('#nombre') ? valorNombre(e.target.value):null
    e.target.matches('#apellido') ? valorApellido(e.target.value):null
    e.target.matches('#email') ? valorEmail(e.target.value):null
    e.target.matches('#contacto') ? valorContacto(e.target.value):null
})