import dayjs from "dayjs";

export function sumDate(date: Date, value: number): Date {
    return dayjs(date).add(value).toDate();
}
