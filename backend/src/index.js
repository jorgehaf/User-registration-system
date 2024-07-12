const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:8080'
}));

app.get('/registration', (req, res) => {
    res.send('Hello from the backend!');
});

app.post('/registration', (req, res) => {
    const isEmpty = Object.keys(req.body).length === 0

    if (!isEmpty) {
        res.status(200).json({ message: 'Usuário cadastrado com sucesso!', data: req.body });
    } else {
        res.status(400).json({ message: 'Dados do usuário inválido.' });
    }
});

app.listen(port, () => {
    console.log(`Backend server is running on http://localhost:${port}`);
});