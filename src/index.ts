import { BandBusiness } from "./Business/BandBusiness";
import { UserBusiness } from "./Business/UserBusiness";
import { app } from "./Controller/app";
import { BandController } from "./Controller/BandController";
import { UserController } from "./Controller/UserController";
import { BandDatabase } from "./Data/BandDatabase";
import { TablesCreator } from "./Data/migrations";
import { UserDatabase } from "./Data/UserDatabase";
import { Authenticator } from "./Services/Authenticator";
import { HashManager } from "./Services/HashManager";
import { IdGenerator } from "./Services/IdGenerator";


const userBusiness = new UserBusiness(
    new IdGenerator(),
    new HashManager(),
    new Authenticator(),
    new TablesCreator(),
    new UserDatabase()
);

const userController = new UserController(
    userBusiness
);

const bandBusiness = new BandBusiness(
    new IdGenerator(),
    new Authenticator(),
    new TablesCreator(),
    new BandDatabase()
)

const bandController = new BandController(
    bandBusiness
)

app.post("/signup", (req, res) => userController.signup(req, res));
app.post("/login", (req, res) => userController.login(req, res));
app.post("/band", (req, res) => bandController.createBand(req,res));