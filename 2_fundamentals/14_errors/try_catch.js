const x = '10'

try {

    if(!Number.isInteger(x)){
        throw new Error('The isn\'t a Integer"')
    }
    console.log('code continuing...')

} catch (error) {
    console.log(`Erro: ${error}`)
}
