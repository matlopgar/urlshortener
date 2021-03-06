const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const yup = require('yup')
const { nanoid } = require('nanoid')
const app = express();

app.use(helmet());
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.static('./public'))

app.get('/', (req, res) => {
    res.json({
        message: 'codecast.sh - Encurtador de URL para o seu PodCast'
    });
});

// app.get('/:id', (req, res) => {
//     //TODO: redirect to url
// });

const schema = yup.object().shape({
    slug: yup.string().trim().matches(/[\w\-]/i),
    url: yup.string().trim().url().required(),

})

app.post('/url', async (req, res, next) => {
    var { slug, url } = req.body;
    try {

        await schema.validate({
            slug,
            url
        });

        if (!slug) {
            slug = nanoid(5);
        };

        slug = slug.toLowerCase();

        res.json({
            slug,
            url,
        });

    } catch (error) {
        next(error);
    }
});

app.use((error, req, res, next) => {
    if (error.staus) {
        res.status(error.status);
    } else {
        res.status(500);
    }
    res.json({
        message: error.message,
        stack: process.env.NODE_ENV === 'production' ? 'ERROR!' : error.stack,
    });
})


// app.get('/url/:id', (req, res) => {
//     //TODO: get a short url by id
// })



const port = process.env.PORT || 8888;

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});