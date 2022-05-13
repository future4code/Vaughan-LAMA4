import { UserInputDTO, LoginInputDTO, User } from "../Model/User";
import { UserDatabase } from "../Data/UserDatabase";
import { IdGenerator } from "../Services/IdGenerator";
import { HashManager } from "../Services/HashManager";
import { Authenticator } from "../Services/Authenticator";
import { TablesCreator } from "../Data/migrations";
import { BandDatabase } from "../Data/BandDatabase";
import { Band, BandInputDTO } from "../Model/Band";


export class BandBusiness {

    constructor(
        private idGenerator: IdGenerator,
        private authenticator: Authenticator,
        private createTable: TablesCreator,
        private BandDB: BandDatabase
    ) { };

    public async createBand(band: BandInputDTO) {
        const { name, genre, responsible, token } = band
        if (!name || !genre || !responsible || !token) {
            throw new Error("Campos incompletos !")
        }

        await this.createTable.createTables();
        const registeredBand: Band | undefined = await this.BandDB.findBandByName(name);

        if (registeredBand) {
            throw new Error("Banda já registrada ! ");
        };

        const userInfo = this.authenticator.getTokenData(token)
        console.log(userInfo)
        if (userInfo.role !== "ADMIN") {
            throw new Error("Somente administradores podem registrar bandas !")
        }

        const id: string = this.idGenerator.generateId();
        const newBand = new Band(
            id,
            name,
            genre,
            responsible
        );
        await this.BandDB.createBand(
            newBand.getId(),
            newBand.getName(),
            newBand.getGenre(),
            newBand.getResponsible()
        )
    }
}