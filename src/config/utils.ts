function getDatesBetween(startDate: Date, endDate: Date, dayOfWeek: number): Date[] {
    const dates: Date[] = [];
    let currentDate = new Date(startDate);

    // Başlangıç tarihinden bitiş tarihine kadar tüm tarihleri kontrol et
    while (currentDate <= endDate) {
        if (currentDate.getDay() === dayOfWeek) {
            dates.push(new Date(currentDate)); // Tarihleri ekleyin
        }
        currentDate.setDate(currentDate.getDate() + 1); // Bir sonraki günü kontrol etmek için bir sonraki günü ayarlayın
    }

    return dates;
}

function getDayIndex(startDay: string): number {
    const daysOfWeek = ['pazar', 'pazartesi', 'salı', 'çarşamba', 'perşembe', 'cuma', 'cumartesi'];
    const startDayIndex = daysOfWeek.indexOf(startDay.toLowerCase());

    if (startDayIndex === -1) {
        throw new Error('Geçersiz başlangıç günü.');
    }

    return startDayIndex;
}

export {
    getDatesBetween,
    getDayIndex
}