const express = require('express');
const hbs = require('hbs')
const fs = require('fs')

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine','hbs');

app.use((req,res,next)=>{
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`

    console.log(log)
    fs.appendFile('server.log', log + '\n', (err)=>{
        if(err){
            console.log('Unable to append to server.log')
        }
    })
    next();
})

// app.use((req,res,next)=>{
//     res.render('maintenance.hbs')
// })

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', ()=>{
    return new Date().getFullYear()
})

hbs.registerHelper('screamIt', (text)=>{
    return text.toUpperCase()
})

app.get('/', (req, res)=>{
    // res.send('<h1>Hello World</h1>');
    // res.send({
    //     name: 'Joni',
    //     age: '17',
    //     hobby: [
    //         'basketball',
    //         'sing a song'
    //     ]
    // })
    res.render('index.hbs',{
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome, my dear'
    })
})

app.get('/about', (req, res)=>{
    res.render('about.hbs', {
        pageTitle: 'About You',
    });
})

// /bad
app.get('/bad', (req,res)=>{
    res.send({
        errorMessage: 'Unable to connect to server'
    })
})

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})