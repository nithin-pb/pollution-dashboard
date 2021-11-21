import moment from 'moment';

export function prepareStartAndEndDates(startDate: string) {
    if (!startDate) return null
    const startDateFormatted = moment(startDate, 'YYYY-MM-DD').format('YYYY-MM-DDT00:00:00+00:00')
    const endDateFormatted = moment(startDate, 'YYYY-MM-DD').format('YYYY-MM-DDT23:59:00+00:00')
    return ({startDate: startDateFormatted, endDate: endDateFormatted})
}

export function prepareGraphSeries(rawData: any[], activeGraph: string) {
    if (!Array.isArray(rawData) || rawData.length < 1) return ({
        axis: [],
        data: []
    })

    const series: any[] = []
    const xAxis: any[] = []
    if (activeGraph !== 'All') series.push({name: activeGraph, data: []})

    for (const item of rawData) {
        const parameterExist = series.some(({name}: { name: string }) => name === item.parameter)
        const axisExist = xAxis.some((axis: any) => axis === moment(item.date.utc).format('HH:mm'))
        if (!axisExist) xAxis.push(moment(item.date.utc).format('HH:mm'))
        if (activeGraph === 'All') {
            if (!parameterExist) {
                series.push({
                    name: item.parameter,
                    data: [{x: moment(item.date.utc).format('HH:mm'), y: item.value}]
                })
            } else {
                const index = series.findIndex(({name}: { name: string }) => name === item.parameter)
                series[index]['data'].push({x: moment(item.date.utc).format('h:mm'), y: item.value})
            }
        } else {
            if (item.parameter === activeGraph) {
                series[0]['data'].push({x: moment(item.date.utc).format('HH:mm'), y: item.value})
            }
        }
    }
    return ({
        axis: xAxis,
        data: series
    })
}