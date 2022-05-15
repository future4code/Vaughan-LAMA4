import { User } from "../Model/User";
import { UserDatabase } from "../Data/UserDatabase";
import { IdGenerator } from "../Services/IdGenerator";
import { HashManager } from "../Services/HashManager";
import { Authenticator } from "../Services/Authenticator";
import { TablesCreator } from "../Data/migrations";
import { BookShowInputDTO, Show } from "../Model/Show";
import { BandDatabase } from "../Data/BandDatabase";
import { Band } from "../Model/Band";
import { ShowDatabase } from "../Data/ShowDataBase";

export class ShowBusiness {

    constructor(
        private idGenerator: IdGenerator,
        private hashManager: HashManager,
        private authenticator: Authenticator,
        private createTable: TablesCreator,
        private userDB: UserDatabase,
        private bandDB: BandDatabase,
        private showDB: ShowDatabase,
    ) { };

    public async bookShow(show: BookShowInputDTO) {
        const { token, bandId, weekDay, startTime, endTime } = show

        if (!token || !bandId || !weekDay || !startTime || !endTime) {
            throw new Error("Campos incompletos !");
        };

        await this.createTable.createTables();

        const userInfo = this.authenticator.getTokenData(token);
        const user: User | undefined = await this.userDB.getUserById(userInfo.id);
        if (!user) {
            throw new Error("Usuário não cadastrado !");
        };
        if (userInfo.role !== "ADMIN") {
            throw new Error("Somente administradores podem marcar shows !")
        };

        const band: Band | undefined = await this.bandDB.findBandById(bandId);
        if (!band) {
            throw new Error("Esta banda não está cadastrada !");
        };

        Show.stringToWeekDay(weekDay);

        if (!Number.isInteger(startTime) || !Number.isInteger(endTime)) {
            throw new Error("Horário(s) inválido(s) !");
        };

        if (!(startTime >= 8 && startTime <= 22 && endTime >= 9 && endTime <= 23)) {
            throw new Error("Horário(s) inválido(s) !");
        };

        for (let i = startTime; i < endTime; i++) {
            const hasShowScheduled: boolean = await this.showDB.searchShowsByTime(weekDay, i, endTime - 1);
            if (hasShowScheduled) {
                throw new Error("Conflito entre shows já marcados");
            };
        };

        const id = this.idGenerator.generateId();
        const newShow = new Show(id, bandId, weekDay, startTime, endTime);

        await this.showDB.createShow(
            newShow.getId(),
            newShow.getWeekDay(),
            newShow.getStartTime(),
            newShow.getEndTime(),
            newShow.getBandId()
        );
    };
};