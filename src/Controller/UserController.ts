import { Request, Response } from "express";
import { UserInputDTO, LoginInputDTO} from "../Model/User";
import { BaseDatabase } from "../Data/BaseDatabase";
import { UserBusiness } from "../Business/UserBusiness";

export class UserController {

    constructor(
        private userBusiness: UserBusiness
    ){};

    public async signup(req: Request, res: Response) {
        try {

            const { email, name, password, role } = req.body;

            const input: UserInputDTO = {
                email,
                name,
                password,
                role
            }

            res.status(200).send();
        } catch (error: any) {
            res.status(400).send({ error: error.message });
        };

        await BaseDatabase.destroyConnection();
    };

    public async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;

            const loginData: LoginInputDTO = {
                email,
                password
            };


            res.status(200).send();

        } catch (error: any) {
            res.status(400).send({ error: error.message });
        };

        await BaseDatabase.destroyConnection();
    };

};

