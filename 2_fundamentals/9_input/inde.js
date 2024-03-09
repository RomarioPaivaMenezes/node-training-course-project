const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
})
    
readline.question("What's your favorite language? ", (language) => {
    
    console.log(`My favorite language is : ${language}`)
    
    if(language == 'Java'){
        console.log('You are the Best!')
    }else if (language == 'Python'){
        console.log('uhhhh no way!')
    }
    
    readline.close()
})
