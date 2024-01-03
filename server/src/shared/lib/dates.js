export const limitDates = (mes) => {
    const mes_date = new Date(mes);
    const START = mes_date.toISOString();
    const END = new Date(
        Date.UTC(mes_date.getUTCFullYear(), mes_date.getUTCMonth() + 1, mes_date.getUTCDate())
    ).toISOString()
    return { START, END }
}