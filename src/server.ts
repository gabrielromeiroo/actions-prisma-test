import app from './app'

// Port Configuration
const PORT = process.env.PORT || 3000

// Express Server Listening and Port Configuration
app.listen(PORT, () => {
    console.log(`🔥: Servidor rodando na porta: ${PORT}`)
})