import {useState} from "react";
import {LocationSearch, Graph} from "../../components";
import './index.scss'
import {Typography} from "@mui/material";

export default function Dashboard() {
    const [date, setDate] = useState('')
    const [location, setLocation] = useState('')

    const handleLocationChange = (_: any, value: string) => {
        setLocation(value)
    }

    const handleDateChange = (e: any) => {
        setDate(e.target.value)
    }

    const adjust = Boolean(date && location)
    return (
        <div className={'dashboard-wrapper dashboard-properties'}>
            <div className={adjust ? 'dashboard-properties' : 'dashboard-visual-aligner dashboard-properties'}>
                <Typography variant={'h4'} gutterBottom sx={{mb: 3, fontWeight: 600}} align={'center'}
                            color={'textSecondary'}>
                    Pollution Information
                </Typography>
                <LocationSearch onDateChange={handleDateChange} onLocationChange={handleLocationChange}/>
                <Graph date={date} location={location}/>
            </div>
        </div>
    )
}