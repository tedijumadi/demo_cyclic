const express = require('express');
const app = express();

app.get('/add', (req, res) => {
    res.send('Hellow World!');
});

app.get('/add', (req, res) => {
    res.send('New recornd added.');
});

//API to show demo data
app.get('/demo',(req, res) =>
    res.json([
        {
            id:'001',
            name:'Smith',
            email:'smith@gmail.com',

        },
        {
            id:'002',
            name:'Sam',
            email:'sam@gmail.com',

        },
        {
            id:'003',
            name:'Lily',
            email:'lily@gmail.com',

        }
    ])
)



const HTTP_PORT = process.env.PORT || 8080;
app.listen(HTTP_PORT, () =>{
    console.log(`Server is listening at port ${HTTP_PORT}`);
});