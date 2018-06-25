
function calcular(jsonData) {
    // const g = new Dygraph('graph', "./../server/datos/principales-tasas-interes-diarias_ok.csv", {
        // console.log(jsonData);
        const g = new Dygraph('graph', jsonData, {
        legend: 'always',
        title: '',
        showRoller: true,
        rollPeriod: 14,
        // customBars: true,
        ylabel: 'Dinero en $',
        strokeWidth: 2,
        visibility: [true, true, true, true]
    });
    setStatus();

    function setStatus() {
        document.getElementById("visibility").innerHTML =
            g.visibility().toString();
    }
    
    function change(el) {
        g.setVisibility(parseInt(el.id), el.checked);
        setStatus();
    }
    
    change(status);
   

    
}





