
var g;
var visibilidad = [$("#0").is(":checked"),$("#1").is(":checked"),$("#2").is(":checked"),$("#3").is(":checked")];
var inversionTotal;
function getInversionTotal(inversion){
    inversionTotal = inversion;
}

function calcular(jsonData) {
    // const g = new Dygraph('graph', "./../server/datos/principales-tasas-interes-diarias_ok.csv", {
    // console.log(jsonData);
    g = new Dygraph('graph', jsonData, {
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
    setStatus();
}

function changeStatus(status) {
    g.setVisibility(parseInt(status.id), status.checked);
    loadTable(inversionTotal);
    setStatus();
}

function setStatus() {
    document.getElementById("visibility").innerHTML =
        g.visibility().toString();
}





