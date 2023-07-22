export const getMonthsAgo = (inputDate) => {

    const currentDate = new Date();
    const startDate = new Date(inputDate);
    let years = currentDate.getFullYear() - startDate.getFullYear();
    let months = currentDate.getMonth() - startDate.getMonth();

    if (months < 0) {
        years--;
        months += 12;
    }
    const textYear = `${years > 0 ? years : ''} ${years > 1 ? 'years' : years === 1 ? 'year' : ''}`;
    const textMonth = `${months > 0 ? months : ''} ${months > 1 ? 'months' : months === 1 ? 'month' : ''}`;
    const and = years > 0 && months > 0 ? 'and' : '';
    return `${textYear} ${and} ${textMonth} Ago`;
}

