export interface BandInputDTO {
    name: string;
    genre: string;
    responsible: string;
    token: string;
};

export interface BandDetailsInputDTO {
    token: string;
    id?: string,
    name?: string
};

export interface BandDetailsOutputDTO {
    id: string;
    name: string;
    genre: string;
    responsible: string;
};

export class Band {
    constructor(
        private id: string,
        private name: string,
        private genre: string,
        private responsible: string

    ) {};

    getId() {
        return this.id;
    };

    getName() {
        return this.name;
    };

    getGenre() {
        return this.genre;
    };

    getResponsible() {
        return this.responsible;
    };


    setId(id: string) {
        this.id = id;
    };

    setName(name: string) {
        this.name = name;
    };

    setGenre(genre: string) {
        this.genre = genre;
    };

    setResponsible(responsible: string) {
        this.responsible = responsible;
    };

    
}