import { Modal } from './modal.js'
import { AlertError } from "./alert-error.js"
import { CalculateIMC, notANumber } from "./utils.js"

// variáveis - variables
const form = document.querySelector('form')
const inputWeight = document.querySelector('#weight')
const inputHeight = document.querySelector('#height')


form.onsubmit = event => {
    event.preventDefault()

    const weight = inputWeight.value
    const height = inputHeight.value

    const wightOrHeightIsNotANumber = notANumber(weight) || notANumber(height)

    if (wightOrHeightIsNotANumber) {
        AlertError.open()
        return;
    }

    AlertError.close()

    const result = CalculateIMC(weight, height)
    displayResultMessage(result)

}

function displayResultMessage(result) {
    let message = `Seu IMC é de ${result}`
    if(result > 0 && result < 16.5){
        message = `Seu IMC é de ${result}\n 
        Peso severamente abaixo do normal`
    }else if (result >= 16.5 && result < 18.5){
        message = `Seu IMC é de ${result}\n 
        Peso abaixo do normal`
    }else if (result >= 18.5 && result < 24.99){
        message = `Seu IMC é de ${result}\n 
        Normal`
    }else if (result >= 25 && result < 30){
        message = `Seu IMC é de ${result}\n 
        Pré-obeso`
    }else if (result >= 30 && result < 35){
        message = `Seu IMC é de ${result}\n 
        Obesidade classe I`
    }else if (result >= 35 && result < 40){
        message = `Seu IMC é de ${result}\n 
        Obesidade classe II`
    }else if (result >= 40){
        message = `Seu IMC é de ${result}\n 
        Obesidade classe III`
    }
    else{
        message = `Erro: Valor Inválido`
        AlertError.open()
    }

    Modal.message.innerText = message
    Modal.open()

}

form.oninput = () => AlertError.close()