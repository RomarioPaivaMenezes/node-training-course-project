const inquirer = require('inquirer')

inquirer
    .prompt([
        {
            name: 'p1', 
            message: 'Which is the first note?',
        },
        {
            name: 'p2', 
            message: 'Which is the second note?',
        }

    ]).then((answers) =>{
        const average = (parseInt(answers.p1) + parseInt(answers.p2)) / 2
        console.log('Note average: %d', average)

    }).catch(err => console.log(err))