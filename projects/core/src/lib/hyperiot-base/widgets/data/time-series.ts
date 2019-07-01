export class TimeSeries {
    /**
     * X-Axis time values
     */
    x: Date[];
    /**
     * Y-Axis data values
     */
    y: number[];

    constructor() {
        this.x = [];
        this.y = [];
    }

    /**
     * Generate random data for the given past days 
     *
     * @param days Number of past days of which to generate random data (starting from now)
     */
    randomize(days: number) {
        const today = new Date();
        while (days >= 0) {
            const pastDate: Date = new Date(today.getTime() - (24 * 60 * 60 * 1000) * days);
            pastDate.setHours(0, 0, 0, 0);
            // generate a value every 5 minutes for the current day
            const intervalMin = 5;
            for (let m = 0; m < 24 * (60 / intervalMin); m++) {
                pastDate.setMinutes(pastDate.getMinutes() + intervalMin);
                if (days === 0 && pastDate.getTime() >= today.getTime()) {
                    break;
                }
                this.x.push(new Date(pastDate.getTime()));
                const randomValue = 20 + (Math.random() * 15);
                this.y.push(randomValue);
            }
            days--;
        }
    }
}
