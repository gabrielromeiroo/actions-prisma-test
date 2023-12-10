import express from 'express'
import { database } from './utils/database'

// Express Initialization
const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    return res.send('Hello World!')
})

app.get('/users', async (req, res) => {
    try {
        const query = await database.user.findMany()
        return res.send(query)
    } catch (error) {
        console.log(error)
        return res.send(error)
    }
})

app.post('/users', async (req, res) => {
    const { id, name, email } = req.body
    try {
        const query = await database.user.create({
            data: {
                id: id,
                name: name,
                email: email,
            }
        })
        return res.send('created')
    } catch (error) {
        return res.send(error)
    }
})

app.delete('/users', async (req, res) => {
    const { id } = req.body
    try {
        const query = await database.user.delete({
            where: {
                id: id
            }
        })
        return res.send('ok')
    } catch (error) {
        return res.send(error)
    }
})

// Express App Export
export default app