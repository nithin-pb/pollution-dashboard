import IDatePicker from "../../interfaces/IDatePicker";
import './index.scss'

export default function DatePicker(props: IDatePicker) {
    const {onDateChange} = {...props}
    return <input type={'date'}
                  max={new Date().toISOString().split("T")[0]}
                  className={'date-picker-input'}
                  data-date-inline-picker="true" onChange={onDateChange}/>
}