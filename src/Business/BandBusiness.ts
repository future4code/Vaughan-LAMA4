import { User } from "../Model/User";
import { UserDatabase } from "../Data/UserDatabase";
import { IdGenerator } from "../Services/IdGenerator";
import { HashManager } from "../Services/HashManager";
import { Authenticator } from "../Services/Authenticator";
import { TablesCreator } from "../Data/migrations";
import { BandDatabase } from "../Data/BandDatabase";
import { Band, BandDetailsInputDTO, BandDetailsOutputDTO, BandInputDTO } from "../Model/Band";


export class BandBusiness {

    constructor(
        private idGenerator: IdGenerator,
        private authenticator: Authenticator,
        private createTable: TablesCreator,
        private BandDB: BandDatabase,
        private UserDB: UserDatabase
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

        const userInfo = this.authenticator.getTokenData(token);
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
    };

    public async bandDetails (bandInfo: BandDetailsInputDTO): Promise<BandDetailsOutputDTO> {
        const { token, id, name } = bandInfo;

        if (!token) {
            throw new Error ("É necessário estar logado !");
        };
        
        if ( (id && name) || (!id && !name) ) {
            throw new Error ("Enviar id OU name");
        };

        const userInfo = this.authenticator.getTokenData(token);
        
        const user: User | undefined = await this.UserDB.getUserById(userInfo.id);
        if (!user) {
            throw new Error("Usuário não cadastrado !");
        };

        let band: Band | undefined

        if (id) {
            band = await this.BandDB.findBandById(id);
        };
        if (name) {
            band = await this.BandDB.findBandByName(name);
        };

        if (!band) {
            throw new Error("Esta banda não está cadastrada !")
        };

        return {
            id: band.getId(),
            name: band.getName(),
            genre: band.getGenre(),
            responsible: band.getResponsible()
        };    
    };
};