export default interface ILocationSearch {
    onLocationChange: (_: any, value: any) => any,
    onDateChange: (e: any) => any,
    date?: any,
    location?: any
}