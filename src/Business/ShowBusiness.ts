import { UserInputDTO, LoginInputDTO, User } from "../Model/User";
import { UserDatabase } from "../Data/UserDatabase";
import { IdGenerator } from "../Services/IdGenerator";
import { HashManager } from "../Services/HashManager";
import { Authenticator } from "../Services/Authenticator";
import { TablesCreator } from "../Data/migrations";
import { BookShowInputDTO, Show } from "../Model/Show";
import { BandDatabase } from "../Data/BandDatabase";
import { Band } from "../Model/Band";

export class UserBusiness {

    constructor(
        private idGenerator: IdGenerator,
        private hashManager: HashManager,
        private authenticator: Authenticator,
        private createTable: TablesCreator,
        private userDB: UserDatabase,
        private BandDB: BandDatabase
    ) { };
    
    public async bookShow (show: BookShowInputDTO) {
        const {token, bandId, weekDay, startTime, endTime} = show

        if ( !token || !bandId || !weekDay || !startTime || !endTime ) {
            throw new Error ("Campos incompletos !");
        };

        const userInfo = this.authenticator.getTokenData(token);     
        const user: User | undefined = await this.userDB.getUserById(userInfo.id);
        if (!user) {
            throw new Error("Usuário não cadastrado !");
        };

        const band: Band | undefined = await this.BandDB.findBandById(bandId);
        if (!band) {
            throw new Error ("Esta banda não está cadastrada !");
        };

        Show.stringToWeekDay(weekDay);

        if (! Number.isInteger(startTime) || ! Number.isInteger(endTime)) {
            throw new Error ("Horário(s) inválido(s) !");
        };

        if ( !(startTime >= 8 && startTime <= 22 && endTime >= 9 && endTime <= 23) ) {
            throw new Error ("Horário(s) inválido(s) !");
        };

        //ToDo: validação - não cadastrar 2 shows no mesmo horário

    };
};