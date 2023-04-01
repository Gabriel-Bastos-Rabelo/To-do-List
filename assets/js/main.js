const inputEntrada = document.querySelector(".input-nova-tarefa")
const botaoAdicionar = document.querySelector(".adicionar")
const listaTarefas = document.querySelector(".tarefas")

function criarTarefa(texto) {
    const itemLista = document.createElement('li')
    itemLista.innerHTML = texto
    listaTarefas.appendChild(itemLista)
    criarBotaoApagar(itemLista)
    inputEntrada.focus()
    salvarTarefas()
}

function limparInput() {
    inputEntrada.value = ""
    inputEntrada.focus()
}

function criarBotaoApagar(itemLista) {
    itemLista.innerHTML += ' '
    const botaoApagar = document.createElement("button")
    botaoApagar.innerHTML = 'Apagar'
    botaoApagar.setAttribute("class", "apagar")
    itemLista.appendChild(botaoApagar)
}

function salvarTarefas() {
    const listaItens = listaTarefas.querySelectorAll("li")
    const listaTextoTarefas = []
    for (item of listaItens) {
        textoTarefa = item.innerText.replace("Apagar", "").trim()
        console.log(textoTarefa)
        listaTextoTarefas.push(textoTarefa)
    }

    const tarefasJSON = JSON.stringify(listaTextoTarefas)
    localStorage.setItem("tarefas", tarefasJSON)
}

function lerTarefas() {
    const tarefas = localStorage.getItem("tarefas")
    const listaTarefas = JSON.parse(tarefas)
    for (textoTarefa of listaTarefas) {
        criarTarefa(textoTarefa)
    }
}

lerTarefas()

inputEntrada.addEventListener("keypress", function (e) {
    if (e.keyCode === 13) {
        if (!inputEntrada.value) return
        criarTarefa(inputEntrada.value)
        limparInput()
    }
})

botaoAdicionar.addEventListener("click", function (e) {
    if (!inputEntrada.value) return
    criarTarefa(inputEntrada.value)
    limparInput()
})

document.addEventListener("click", function (e) {
    el = e.target
    if (el.classList.contains("apagar")) {
        el.parentElement.remove()
        salvarTarefas()
    }
})