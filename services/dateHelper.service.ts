function dateHelper(dateString) {
    let d = dateString.split("/");
    d = d.map(Number)
    return getDateOnly(new Date(d[2], d[1]-1, d[0]));
}

function getDateOnly(date: Date): Date {
    // Ensures timezone issues are accounted for
    return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
}

export { dateHelper };