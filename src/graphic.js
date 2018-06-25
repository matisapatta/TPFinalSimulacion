
function calcular(jsonData) {
    // const g = new Dygraph('graph', "./../server/datos/principales-tasas-interes-diarias_ok.csv", {
        const g = new Dygraph('graph', jsonData, {
        legend: 'always',
        title: 'Título',
        showRoller: true,
        rollPeriod: 14,
        // customBars: true,
        ylabel: 'Tasa',
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





