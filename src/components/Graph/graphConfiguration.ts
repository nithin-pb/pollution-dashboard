export const graphConfiguration: any = {
    series: [],
    options: {
        chart: {
            height: 350,
            fontfamilty: "Roboto",
            toolbar: {
                show: false
            },
            zoom: {
                autoScaleYaxis: true
            }
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
                endingShape: 'rounded'
            },
        },
        dataLabels: {
            enabled: false
        },
        xaxis: {
            type: 'time',
            tickAmount: 20,
        },
        stroke: {
            show: true,
            width: 2,
        },
        /*xaxis: {
            categories: [],
        },*/
        yaxis: {
            /*title: {
                text: '$ (thousands)'
            }*/
        },
        fill: {
            opacity: 1
        },
    },
};