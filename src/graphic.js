const g=new Dygraph('graph', "./src/ny-vs-sf.txt", {
    legend: 'always',
    title: 'NYC vs. SF',
    showRoller: true,
    rollPeriod: 14,
    // customBars: true,
    ylabel: 'Temperature (F)',
});