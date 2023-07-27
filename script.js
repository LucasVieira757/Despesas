// Transação que recebe um elemento seletor e coloca na 
const transactionsUl = document.querySelector('#transactions')

// dom para colocar na tela 
const incomeDisplay = document.querySelector('#money-plus')
const expanseDisplay = document.querySelector('#money-minus')
const balanceDisplay = document.querySelector('#balance')

// Criando uma lista de eventos para o form adicionar transasões 
const form = document.querySelector('#form')
const inputTransactionName = document.querySelector('#text')
const inputTransactionAmount = document.querySelector('#amount')

// Criando uma array com id nome e amount para poder realizar as transações 


const localStorageTransations = JSON.parse(localStorage.
    getItem('transactions'))
let transactions = localStorage.
    getItem('transactions') !== null ? localStorageTransations : []

// função que remeve a transação 
const RemoveTransaction = ID => {
    transactions = transactions.filter
    (transaction => transaction.id !== ID)
    updateLocalStorage()
    init()
}
// agora vamos adiconar ela no dom para que a UL Vazia seja preenchida 
const addTransactionIntoDOM = transaction => {
    // nessa operação operator caso a transação for verdadeiro a const vai armazenar uma 
    const operator = transaction.amount < 0 ? '-' : '+'
    const CSSClass = transaction.amount < 0 ? 'minus' : 'plus'
    const amountWithoutOperator = Math.abs(transaction.amount)
    const li = document.createElement('li')


    li.classList.add(CSSClass)
    li.innerHTML = `
    ${transaction.name} <span>${operator} R$ ${amountWithoutOperator} </span>
    <button class="delete-btn" onClick="RemoveTransaction(${transaction.id})">
    x
    </button>

    `
    transactionsUl.append(li)


}

const updateBelanceValues = () => {
    const transactionAmounts = transactions
        .map(transaction => transaction.amount)
    const total = transactionAmounts
        .reduce((accumulator, transaction) => accumulator + transaction, 0)
        .toFixed(2)
    const income = transactionAmounts
        .filter(value => value > 0)
        .reduce((accumulator, value) => accumulator + value, 0)
        .toFixed(2)

    const expanse = Math.abs(transactionAmounts
        .filter(value => value < 0)
        .reduce((accumulator, value) => accumulator + value, 0))
        .toFixed(2)


    balanceDisplay.textContent = ` R$ ${total}`
    incomeDisplay.textContent = ` R$ ${income}`
    expanseDisplay.textContent = ` R$ ${expanse}`

}

const init = () => {
    transactionsUl.innerHTML = ''
    transactions.forEach(addTransactionIntoDOM)
    updateBelanceValues()

}
init()

const updateLocalStorage = () => {
    localStorage.setItem('transactions', JSON.stringify(transactions))
}

const generateID = () => Math.round(Math.random() * 1000)


// Criando função que quando clicar no botão vai inserir transtição 
form.addEventListener('submit', event => {
    event.preventDefault()
    const transactionName = inputTransactionName.value.trim()
    const transactionAmounts = inputTransactionAmount.value.trim()

    if (transactionName === '' || transactionAmounts === '') {
        alert('Por favor, preencha tanto o nome quanto o valor da transação')
        return
    }

    const transaction = {
        id: generateID(),
        name: transactionName,
        amount: Number(transactionAmounts)
    }

    transactions.push(transaction)
    init()
    updateLocalStorage()

    inputTransactionName.value = ''
    inputTransactionAmount.value = ''
})