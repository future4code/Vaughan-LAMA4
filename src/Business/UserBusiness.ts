import { UserInputDTO, LoginInputDTO, User } from "../Model/User";
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
    ) { };

    public async createUser(user: UserInputDTO) {
        const { email, name, password, role } = user;
       

        if (!email || !name || !password || !role) {
            throw new Error("Campos incompletos !");
        }

        if (!email.includes("@")) {
            throw new Error("Email inválido !");
        }

        await this.createTable.createTables();

        const registeredemail: User | undefined = await this.userDB.getUserByEmail(email)
        if (registeredemail) {
            throw new Error("Email já registrado ! ");
        };

        const id = this.idGenerator.generateId()
    
        const newUser: User = new User(id, name, email, password, role);
        
        User.stringToUserRole(role);
        const cypherPassword = await this.hashManager.hash(password);

        await this.userDB.createUser(
            newUser.getId(),
            newUser.getName(),
            newUser.getEmail(),
            cypherPassword,
            newUser.getRole()
        );

        const token: string = this.authenticator.generateToken({
           id: newUser.getId(),
           role: User.stringToUserRole(role)
        });

        return token;
    };

    public async login(user: LoginInputDTO) {
        const {email, password} = user

        if (!email || !password ) {
            throw new Error("Campos incompletos !");
        }

        if (!email.includes("@")) {
            throw new Error("Email inválido !");
        }

        await this.createTable.createTables();
        const registeredemail: User | undefined = await this.userDB.getUserByEmail(email);

        if (!registeredemail) {
            throw new Error("Email não registrado ! ");
        };
        
        const isPasswordCorret:boolean = await this.hashManager.compare(password, registeredemail.getPassword())
        if(!isPasswordCorret){
            throw new Error("Senha inválida !")
        }
        
        const token: string = this.authenticator.generateToken({
            id: registeredemail.getId(),
            role: User.stringToUserRole(registeredemail.getRole())
         });
 
         return token;
    };
};