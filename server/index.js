const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');

const app = express();

app.use(helmet());
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        message: 'codecast.sh - Encurtador de URL para o seu PodCast'
    });
});


const port = process.env.PORT || 8888;

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});