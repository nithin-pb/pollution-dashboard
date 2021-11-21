import {useEffect, useState} from "react";
import {Box, CircularProgress, Collapse, Paper, Tab, Tabs} from "@mui/material";
import ReactApexChart from "react-apexcharts";
import {graphConfiguration} from './graphConfiguration'
import {IEndPointGetPollutionData, IGraph} from "../../interfaces";
import apiEndPoints from "../../services";
import {prepareGraphSeries, prepareStartAndEndDates} from "./urls";

const paperStyleProps = {
    width: '100%',
    maxWidth: 1200,
    margin: 'auto',
    marginTop: 8,
    p: 2,
    pt: 1,
    pl: 0,
    borderRadius: 2
}
const graphWrapperPaper = {
    p: 2,
    pt: 2,
    pl: 3,
    pb: 1
}

export default function Graph(props: IGraph) {
    const {location, date} = {...props}
    const [graphData, setGraphData] = useState<any>(null)
    const [activeGraph, setActiveGraph] = useState(0)
    const [originalData, setOriginalData] = useState([])
    const [progress, setProgress] = useState({loading: true, ready: false, error: false})

    const fetchData = async () => {
        try {
            setProgress({loading: true, ready: false, error: false})
            const {startDate, endDate} = prepareStartAndEndDates(date) || {startDate: null, endDate: null}
            const params: IEndPointGetPollutionData = {
                city: location,
                date_from: startDate,
                date_to: endDate,
                offset: 0,
                order_by: 'datetime',
                page: 1,
                radius: 1000,
                sort: 'desc',
                entity: 'government',
                limit: 100000,
                sensorType: 'reference grade'
            }
            const {data: {results}} = await apiEndPoints.pollutionData().getPollutionData(params)
            setOriginalData(JSON.parse(JSON.stringify(results)))
            const {data} = prepareGraphSeries(results, pollutionData[activeGraph]) || {axis: null, data: null}
            graphConfiguration.series = data || []
            setGraphData(graphConfiguration)
            setProgress({loading: false, ready: true, error: false})
        } catch (e) {
            setProgress({loading: true, ready: false, error: true})
        }
    }


    useEffect(() => {
        if (location && date) {
            fetchData().then()
        }
    }, [location, date])

    useEffect(() => {
        setProgress({loading: true, ready: false, error: false})
        setGraphData(null)
        const {data} = prepareGraphSeries(originalData, pollutionData[activeGraph]) || {axis: null, data: null}
        graphConfiguration.series = data || []
        setGraphData(graphConfiguration)
        setTimeout(() => {
            setProgress({loading: false, ready: true, error: false})
        }, 2000)
    }, [activeGraph])

    return (
        <Box width={'100%'}>
            <Collapse in={Boolean(location && date)}>
                <Paper
                    style={{boxShadow: 'var(--pd-shadow-1)'}}
                    sx={paperStyleProps}
                    elevation={0}>
                    <Tabs aria-label="basic tabs example" value={activeGraph}
                          onChange={(_, e: any) => setActiveGraph(e)}>
                        {
                            pollutionData.map((parameter, index) => <Tab label={parameter} key={index}/>)
                        }
                    </Tabs>
                    <Paper sx={graphWrapperPaper} elevation={0}>
                        {progress.loading && <CircularProgress size={24}/>}
                        {progress.ready && <ReactApexChart options={graphData.options || {}}
                                                           series={graphData.series || []}
                                                           type="line"
                                                           height={400}/>}
                    </Paper>
                </Paper>
            </Collapse>
        </Box>
    )
}


const pollutionData = ['co', 'pm10', 'pm25', 'o3', 'so2', 'no2', 'All']