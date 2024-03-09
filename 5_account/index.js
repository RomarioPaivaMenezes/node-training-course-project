
const inquirer = require('inquirer')
const chalk = require('chalk')
const fs = require('fs')

console.log('Account initialized!!!')
operation();

function operation() {

    inquirer.prompt([
        {
        type: 'list',
        name: 'action',
        message: 'what you wanna do?',
        choices: ['Create account', 'Check balance', 'Deposit', 'Withdraw', 'Exit'],
        },
]).then((answer) => {

    const action = answer['action']
    console.log(action)

    if(action === 'Create account'){
        createAccount()
    }else if (action === 'Check balance'){
        getAccountBalance()

    }else if (action === 'Deposit'){
        deposit()

    }else if (action === 'Withdraw'){
        withdraw()

    }else if (action === 'Exit'){
        console.log(chalk.bgBlue('Thank You for using Accounts!'))
        process.exit()
    }    


}).catch(err => {console.log(err)}) 

}


function createAccount(){

    console.log(chalk.bgGreen.black('Thank you for chosing us!!'))
    console.log(chalk.green('Then define you account details:'))
    buildAccount()

}

function buildAccount(){
    
    inquirer.prompt([
        {
        name: 'accountName',
        message: 'Type your account name: ',
        },
    ]).then((answer) => {

        const accountName = answer['accountName']
        console.log(accountName)

        if(!fs.existsSync('accounts')) {
            fs.mkdirSync('accounts')
        }

        if(fs.existsSync(`accounts/${accountName}.json`)) {
            console.log(chalk.bgRed.black('Account name already exists! Please choose another name!'))
            buildAccount()
            return
        }else{
            fs.writeFileSync(`accounts/${accountName}.json`, '{"balance": 0}', function(err){
                console.log(err)
            })
            console.log(chalk.green('Congratulations!! Your account has been created!'))
            operation()
        }
    }).catch(err => {console.log(err)}) 

}

// add an amount to the user's account
function deposit(){

    inquirer.prompt([
        {
        name: 'accountName',
        message: 'What is your account name?: ',
        },
    ]).then((answer) => {

        const accountName = answer['accountName']

        if(!checkAccount(accountName)){
            return deposit()
        }

        inquirer.prompt([
            {
                name: 'amount',
                message: 'How much do you want to deposit?'
            }
        ]).then((answer) => {
           
            const amount = answer['amount']

            addAmount(accountName, amount)
            operation()

        }).catch(err => {console.log(err)}) 
        
    }).catch(err => {console.log(err)}) 

}

function addAmount(accountName, amount){
    const accountData = getAccount(accountName)    

    if(!amount){
        console.log(chalk.bgRed.black('An error has occurred! Please try again later!'))
        return deposit()
    }

    accountData.balance = parseFloat(amount) + parseFloat(accountData.balance)

    fs.writeFileSync(
        `accounts/${accountName}.json`,
        JSON.stringify(accountData),
        function err() {console.log(err)}
    )

    console.log(chalk.green(`The value of $${amount} has been deposited in your account!`))

}

function getAccount(accountName){
    const accountJSON = fs.readFileSync(`accounts/${accountName}.json`, {
        encoding: 'utf8',
        flag: 'r'
    })

    return JSON.parse(accountJSON)
    
}

function withdrawAmount(accountName, amount){
    const accountData = getAccount(accountName)    

    if(!amount){
        console.log(chalk.bgRed.black('An error has occurred! Please try again later!'))
        return deposit()
    }

    if(accountData.balance >= amount ){
        accountData.balance =  parseFloat(accountData.balance) - parseFloat(amount)
        console.log(chalk.green(`The value of $${amount} has been withdrawn from your account!`))
        operation()
    }else{
        console.log(chalk.bgRed.black('your balance isn\'t enourgh for this operation!'))
        return withdraw()
    }

    fs.writeFileSync(
        `accounts/${accountName}.json`,
        JSON.stringify(accountData),
        function err() {console.log(err)}
    )

   
}

function getAccount(accountName){
    const accountJSON = fs.readFileSync(`accounts/${accountName}.json`, {
        encoding: 'utf8',
        flag: 'r'
    })

    return JSON.parse(accountJSON)
    
}

function checkAccount(accountName){

    if(!fs.existsSync(`accounts/${accountName}.json`)) {
        console.log(chalk.bgRed('This account doesn\'t exist! Choose the correct accountName:'))
        return false
    }
    
    return true
}


function getAccountBalance(){

    inquirer.prompt([
        {
        name: 'accountName',
        message: 'What is your account name?: ',
        },

    ]).then((answer) => {

        const exit = answer['exit']

        const accountName = answer['accountName']

        if(!checkAccount(accountName)){
            return getAccountBalance()
        }

        const account = getAccount(accountName)

        console.log(chalk.bgBlue(`Hello, your current balance is : $${account.balance}`))
        operation()
        
    }).catch(err => {console.log(err)}) 

}


function withdraw(){

    inquirer.prompt([
        {
            name: 'accountName',
            message: 'What is your account name?: ',
        },
        
    ]).then((answer) => {

        const accountName = answer['accountName']

        if(!checkAccount(accountName)){
            return withdraw()
        }

        inquirer.prompt([
            {
                name: 'amount',
                message: 'How much do you want to withdraw?'
            },
        
        ]).then((answer) => {
           
            if(!answer['amount']){
                operation()
            }

            const amount = answer['amount']

            withdrawAmount(accountName, amount)

        }).catch(err => {console.log(err)}) 

        
    }).catch(err => {console.log(err)}) 

}