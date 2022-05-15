export interface BookShowInputDTO {
    token: string;
    bandId: string
    weekDay: string;
    startTime: number;
    endTime: number;
};

export interface ShowsByDayInputDTO {
    weekDay: string,
    token: string
};

export interface ShowsByDayOutputDTO {
    name: string,
    genre: string
};

export class Show {
    constructor(
        private id: string,
        private bandId: string,
        private weekDay: string,
        private startTime: number,
        private endTime: number
    ) {};

    getId() {
        return this.id;
    };

    getBandId() {
        return this.bandId;
    };

    getWeekDay() {
        return this.weekDay;
    };

    getStartTime() {
        return this.startTime;
    };
    
    getEndTime() {
        return this.endTime;
    };

    setId(id: string) {
        this.id = id;
    };

    setBandId(bandId: string) {
        this.bandId = bandId;
    };

    setWeekDay(weekDay: string) {
        this.weekDay = weekDay;
    };

    setStartTime(startTime: number) {
        this.startTime = startTime;
    };
    
    setEndTime(endTime: number) {
        this.endTime = endTime;
    };
      
    static stringToWeekDay(input: string): WeekDay {
        switch (input) {
            case "SEXTA":
                return WeekDay.SEXTA;
            case "SABADO":
                return WeekDay.SABADO;
            case "DOMINGO":
                return WeekDay.DOMINGO;
            default:
                throw new Error("Dia inválido");
        };
    };

    static toShowModel(show: any): Show {
        return new Show(show.id, show.bandId, Show.stringToWeekDay(show.weekDay), show.startTime, show.endTime);
    };

};

export enum WeekDay {
    SEXTA = "SEXTA",
    SABADO = "SABADO",
    DOMINGO = "DOMINGO"
};