/*
Dependencias
 */
const express = require('express')
const cors = require('cors');
const csv = require('csvtojson');
const app = express()


app.use(cors());
app.get('/', function (req, res) {
  res.send('Hello World!!')
});

app.get('/datos/', function (req, res) {
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
const pathDolar = './datos/tipos-de-cambio-historicos_ok.csv';


// app.get('/datos1/', function (req, res) {
//   csv()
//     .fromFile(path).then((jsonObj) => {
//       console.log(jsonObj);
//       res.json(jsonObj);
//     });
// })

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});



class jsonItem {
    get json(){
      return this.contenido;
    }
    set json(value){
      this.contenido = value;
    }
  
    getLastVal(){ //Ultimo valor de los datos actuales desde CSV
      return this.contenido[this.contenido.length-1].valor;
    }

    getFutureDate(nDays){
      var someDate = new Date(this.contenido[this.contenido.length-1].fecha);
      someDate.setDate(someDate.getDate() + nDays); 
    
      var dd = someDate.getDate();
      var mm = someDate.getMonth() + 1;
      var y = someDate.getFullYear();
    
      var someFormattedDate = mm + '/'+ dd + '/'+ y;
    
      return someFormattedDate;
    }

    predictVal(t){//Predice el valor para dentro de 't' dias
 
    }

    jsonPrediction(days){//Devuelve el json con los datos mas los datos de predicciones de dias futuros para los proximos t dias
 
    }
  
  }
class dolarObj extends jsonItem {
// formula dolar: Yt = 14.2998 - 0.000676×t + 0.000009×t^2 + 0.43415R, -1 < R < 1
  
  predictVal(t){//Predice el valor del dolar para dentro de 't' dias
    var r = (Math.random() * 2) - 1;
    return 14.2998 - 0.000676*(t+867) + 0.000009*Math.pow((t+867), 2) + 0.43415*r + (this.getLastVal() - 20.535);
  }
  jsonPrediction(days){//Devuelve el json con los datos mas los datos de predicciones de dias futuros para los proximos dias
    var result = [];
    var i;
    for (i = 0; i <= days; i++) {
      result[i] = {fecha: this.getFutureDate(i+1), valor: this.predictVal(i+1).toString()};
    }
    return result;
  }

}

var jsonPredicted;

async function main() {
  var dolar = new dolarObj();
  dolar.json = await csv().fromFile(pathDolar);
  jsonPredicted = dolar.jsonPrediction(3500);
  // console.log(jsonPredicted);
}

app.get('/calcular',function (req,res){
  res.json(jsonPredicted);
})


main();
/*function GetPercentVariations(jsonRaw) {
  var i;
  for (i = 0; i < jsonRaw.length-1; i++) {
    text += cars[i] + "<br>";
  } 
}*/
