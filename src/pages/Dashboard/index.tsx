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

    return (
        <div className={'dashboard-wrapper'}>
            <Typography variant={'h4'} gutterBottom sx={{mb: 3, fontWeight: 600}} color={'textSecondary'}> Pollution Information</Typography>
            <LocationSearch onDateChange={handleDateChange} onLocationChange={handleLocationChange}/>
            <Graph date={date} location={location}/>
        </div>
    )
}