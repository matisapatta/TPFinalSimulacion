
var g;
var g1;
var g2;
var g3;
var g4;
var visibilidad = [$("#0").is(":checked"),$("#1").is(":checked"),$("#2").is(":checked"),$("#3").is(":checked")];
var inversionTotal;
function getInversionTotal(inversion){
    inversionTotal = inversion;
}

function calcular(jsonData,dolar,tasa,fci,lebac) {
    // const g = new Dygraph('graph', "./../server/datos/principales-tasas-interes-diarias_ok.csv", {
    // console.log(jsonData);
    g = new Dygraph('graph', jsonData, {
        legend: 'always',
        title: '',
        showRoller: true,
        rollPeriod: 14,
        // customBars: true,
        //ylabel: 'Dinero en $',
        labels: ['Fecha','Dolar','Fondos de Inversion','Plazo Fijo','Lebac'],
        strokeWidth: 2,
        visibility: visibilidad
    });
    g1 = new Dygraph(document.getElementById("dolargraf"), dolar, {
        legend: 'always',
        title: '',
        showRoller: true,
        rollPeriod: 14,
        // customBars: true,
        ylabel: 'Dinero en $',
        strokeWidth: 2,
        visibility: visibilidad
    });
    g2 = new Dygraph(document.getElementById("tasasgraf"), tasa, {
        legend: 'always',
        title: '',
        showRoller: true,
        rollPeriod: 14,
        // customBars: true,
        ylabel: 'Dinero en $',
        strokeWidth: 2,
        visibility: visibilidad
    });
    g3 = new Dygraph(document.getElementById("lebacgraf"), lebac, {
        legend: 'always',
        title: '',
        showRoller: true,
        rollPeriod: 14,
        // customBars: true,
        ylabel: 'Dinero en $',
        strokeWidth: 2,
        visibility: visibilidad
    });
    g4 = new Dygraph(document.getElementById("fcigraf"), fci, {
        legend: 'always',
        title: '',
        showRoller: true,
        rollPeriod: 14,
        // customBars: true,
        ylabel: 'Dinero en $',
        strokeWidth: 2,
        visibility: visibilidad
    });
    // console.log(inversionTotal);
    loadTable(inversionTotal);
    changeStatus(status);
    // setStatus();
}

function changeStatus(status) {
    g.setVisibility(parseInt(status.id), status.checked);
    loadTable(inversionTotal);
    //setStatus();
}

// function setStatus() {
//     document.getElementById("visibility").innerHTML =
//         g.visibility().toString();
// }





