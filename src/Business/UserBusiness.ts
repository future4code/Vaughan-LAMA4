import { UserInputDTO, LoginInputDTO } from "../Model/User";
import { UserDatabase } from "../Data/UserDatabase";
import { IdGenerator } from "../Services/IdGenerator";
import { HashManager } from "../Services/HashManager";
import { Authenticator } from "../Services/Authenticator";
import { TablesCreator } from "../Data/migrations";

export class UserBusiness {

    constructor(
        private idGenerator: IdGenerator,
        private hashManager: HashManager,
        private authenticator: Authenticator,
        private createTable: TablesCreator,
        private userDB: UserDatabase
    ){};

    public async createUser(user: UserInputDTO) {

    };

    public async getUserByEmail(user: LoginInputDTO) {

    };
};