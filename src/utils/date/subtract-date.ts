import dayjs from 'dayjs'

export function subtractDate(date: Date, value: number): Date {
    return dayjs(date).subtract(value).toDate();
}
