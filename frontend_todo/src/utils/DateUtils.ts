export function formatDate(date: Date) {
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    const [year, month, day] = date.toISOString().split('T')[0].split('-');
    return `${+day} ${months[+month - 1]} ${year}`;
}
