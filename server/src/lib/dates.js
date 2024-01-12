export const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

//MONTH = "2023-01"
export function getLimitDates({ MONTH }) {
    const START_DATE = new Date(MONTH);
    const END_DATE = new Date(START_DATE.getUTCFullYear(), START_DATE.getUTCMonth() + 1, START_DATE.getUTCDate() - 1);
    return {
        START_DATE: START_DATE.toISOString().split("T")[0],
        END_DATE: END_DATE.toISOString().split("T")[0]
    }

}

export function getToday() {
    const todayDate = new Date();
    return {
        today: todayDate.toISOString().split("T")[0],
        todayFull: todayDate.toISOString(),
        todayDate
    }
}

export function addMonth(dateString, add) {
    const date = new Date(dateString);
    return new Date(date.getUTCFullYear(), date.getUTCMonth() + add, date.getUTCDate()).toISOString().split("T")[0];

}

