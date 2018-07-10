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

const pathTasaInt = './datos/principales-tasas-interes-diarias_ok.csv';
const pathDolar = './datos/tipos-de-cambio-historicos_ok.csv';
const pathLebac = './datos/lebaq-tasas-interes_ok.csv';
const pathFondosInv = './datos/fondo_inversion_ok.csv';

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
      //var someDate = new Date(this.contenido[this.contenido.length-1].fecha); //fecha desde la ultima entrada del archivo
      var someDate = new Date(); //fecha de hoy
      someDate.setDate(someDate.getDate() + nDays); 
    
      var dd = someDate.getDate();
      var mm = someDate.getMonth() + 1;
      var y = someDate.getFullYear(); 
    
      var someFormattedDate = mm + '/'+ dd + '/'+ y;
    
      return someFormattedDate;
    }

    predictVal(t){//Predice el valor para dentro de 't' dias
 
    }

    jsonPrediction(days){//Devuelve el json con los datos mas los datos de predicciones de dias futuros para los proximos dias
      this.result = [];
      var i;
      for (i = 0; i <= days; i++) {
        this.result[i] = {fecha: this.getFutureDate(i+1), valor: this.predictVal(i+1).toString()};
      }
      return this.result;
    }
  
  }
class dolarObj extends jsonItem {
//USD = 14.2998 - 0.000676×t + 0.000009×t^2 + 0.43415xR + (valorActual  - 20.535), -1 < R < 1
  
  

  predictVal(t){//Predice el valor del dolar para dentro de 't' dias
    var r = (Math.random() * 2) - 1;
    var sumacrisis = 0;
    var rcrisis = Math.random();
    if( v_crisis == 'true' ){
      if(rcrisis>0.95){
        sumacrisis = Math.random()*1.2;
        dolarHoy = dolarHoy + sumacrisis;
      }
    } else {
      dolarHoy = this.getLastVal();
    }
    // return 14.2998 - 0.000676*(t+867) + 0.000009*Math.pow((t+867), 2) + 0.43415*r + (this.getLastVal() - 20.535);

    return 14.2998 - 0.000676*(t+867) + 0.000009*Math.pow((t+867), 2) + 0.43415*r + (dolarHoy - 20.535);
  }


  

}
class tasaIntObj extends jsonItem { 
  //Tasa de Interés = (valort-1 + valort-2) / 2 + 0.43932×R
  predictVal(t){//Predice la tasa de interes para dentro de 't' dias
  
    var r = (Math.random() * 2) - 1;
    if (t==1)
      return (parseFloat(this.getLastVal()) + parseFloat(this.contenido[this.contenido.length-2].valor))/2 + 0.43932*r;
    else if (t==2)
      return (parseFloat(this.getLastVal()) + parseFloat(this.result[0].valor))/2 + 0.43932*r;
    else
      return (parseFloat(this.result[t-2].valor)+ parseFloat(this.result[t-3].valor))/2 + 0.43932*r;
  }

}
class lebacObj extends jsonItem { 
  //Tasa de Lebacs = (valort-1 + valort-2) / 2 + 0.146160×R
      
  predictVal(t){//Predice la tasa de interes para dentro de 't' dias
  
    var r = (Math.random() * 2) - 1;
    if (t==1)
      return (parseFloat(this.getLastVal()) + parseFloat(this.contenido[this.contenido.length-2].valor))/2 + 0.146160*r;
    else if (t==2)
      return (parseFloat(this.getLastVal()) + parseFloat(this.result[0].valor))/2 + 0.146160*r;
    else
      return (parseFloat(this.result[t-2].valor)+ parseFloat(this.result[t-3].valor))/2 + 0.146160*r;
  }

}
class fondoInvObj extends jsonItem { 
  //Fondos de Inversión = 71.411 + 0.034873×t + 1.34441×R + (valorActual  - 92.1945)
      
  predictVal(t){//Predice el valor de fondos de inversion para dentro de 't' dias
    var r = (Math.random() * 2) - 1;
    return 71.411 + 0.034873*(t+596) + 3.34441*r + (this.getLastVal() - 92.1945);
  }

}


var jsonPredicted = [];
var jsonPredictedDolar;
var jsonPredictedTasaInt;
var jsonPredictedLebac;
var jsonPredictedFondosInv;
var dolarHoy;
var v_crisis;

async function main(crisis) {
  const days = 3700;
  v_crisis = crisis;
  var dolar = new dolarObj();  
  dolar.json = await csv().fromFile(pathDolar);
  dolarHoy = parseFloat(dolar.getLastVal());
  jsonPredictedDolar = dolar.jsonPrediction(days);

  var tasaInt = new tasaIntObj();
  tasaInt.json = await csv().fromFile(pathTasaInt);
  jsonPredictedTasaInt = tasaInt.jsonPrediction(days);

  var lebac = new lebacObj();
  lebac.json = await csv().fromFile(pathLebac);
  jsonPredictedLebac = lebac.jsonPrediction(days);

  var fondosInv = new fondoInvObj();
  fondosInv.json = await csv().fromFile(pathFondosInv);
  jsonPredictedFondosInv = fondosInv.jsonPrediction(days);

  
  var i;
  for (i = 0; i < days; i++) {
    jsonPredicted[i] = {fecha: jsonPredictedDolar[i].fecha, valorDolar: jsonPredictedDolar[i].valor, 
                                                    valorTasaInt: jsonPredictedTasaInt[i].valor, 
                                                    valorLebac: jsonPredictedLebac[i].valor, 
                                                    valorFondosInv: jsonPredictedFondosInv[i].valor};
  }

}

app.get('/calcular',function (req,res){
  main(req.query.crisis);
  res.json(jsonPredicted);
})



main();
/*function GetPercentVariations(jsonRaw) {
  var i;
  for (i = 0; i < jsonRaw.length-1; i++) {
    text += cars[i] + "<br>";
  } 
}*/
