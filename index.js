import app from './app'

app.listen(app.get('port'), () => {
    console.log(`APP LISTEN on PORT ${app.get('port')}`)
})