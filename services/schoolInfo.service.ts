
const findSchoolMinPrice = (school, length_of_study_weeks) : number => {

    let prices: number[] = []
    school.courses.forEach(course => {
        let price_per_week = findCourseMinPrice(course, length_of_study_weeks);
        prices.push(price_per_week * length_of_study_weeks)
    })

    return Math.min(...prices)
}

const findCourseMinPrice = (course, length_of_study_weeks) : number => {
    let price_per_week = course.price_per_week
    if (course.dynamic_pricing) {
        course.dynamic_pricing.forEach(p => {
            if (p.min_weeks <= length_of_study_weeks && price_per_week > p.price_per_week) {
                price_per_week = p.price_per_week
            }
        })
    }
    return price_per_week
}

export { findSchoolMinPrice, findCourseMinPrice };