function dateHelper(dateString) {
    let d = dateString.split("/");
    return new Date(d[2] + '/' + d[1] + '/' + d[0]);
}

export { dateHelper };