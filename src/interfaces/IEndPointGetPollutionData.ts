export default interface IEndPointGetPollutionData {
    date_from: string | null,
    date_to: string | null,
    page: number,
    offset: number,
    sort: 'asc' | 'desc',
    radius: number,
    city: string,
    order_by: string,
    unit?: string,
    parameter?: string,
    entity?: 'government',
    limit: number,
    sensorType: 'reference grade'
}