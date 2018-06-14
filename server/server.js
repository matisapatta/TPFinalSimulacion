/*
Dependencias
 */
const express = require('express')
const cors = require('cors');
const csv = require('csvtojson');
const app = express()


app.use(cors());
app.get('/', function(req, res) {
  res.send('Hello World!!')
});

app.get('/datos/',function(req,res){
    res.json(
        [{
        x: ['2013-10-04 22:23:00', '2013-11-04 22:23:00', '2013-12-04 22:23:00'],
        y: [1, 3, 6],
        type: 'scatter'
        }]
    );
        
})

// // Pido estado de una sala
// app.get('/sala/:name', function(req, res) {
//   Sala.findOne({name: req.params.name}).then(function(response) {
//     if (!response) return res.json({err: 'No la encontre'});
//     res.json(response);
//   });
// });

// Creo una sala
// app.post('/sala/:name', function (req, res) {
//   const sala = new Sala({ name: req.params.name });
//   sala.save().then(function () {
//     res.json({msg: 'sala creada ' +  sala.name});
//   });
// });

// app.post('/sala/:name/ocupar', function (req, res) {
//   Sala.findOne({name: req.params.name}).then(function(sala) {
//     if (!sala) return res.json({err: 'No la encontre'});

//     sala.disponible = false;
//     sala.save().then(function() {
//       res.send("Sala " +  sala.name + " ocupada.");
//     });
//   });
// });
const path = './datos/lebaq-tasas-interes_ok.csv';

csv()
.fromFile(path).then((jsonObj) => {
  console.log(jsonObj);
});



app.listen(3000, function() {
  console.log('Example app listening on port 3000!')
});
