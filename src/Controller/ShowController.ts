import { Request, Response } from "express";
import { BaseDatabase } from "../Data/BaseDatabase";
import { ShowBusiness } from "../Business/ShowBusiness";
import { BookShowInputDTO } from "../Model/Show";

export class ShowController {

    constructor(
        private showBusiness: ShowBusiness
    ){};

    public async bookNewShow(req: Request, res: Response) {
        try {

            const {bandId, weekDay, startTime, endTime} = req.body;
            const token = req.headers.authorization as string;
            
            const input: BookShowInputDTO = {
                token,
                bandId,
                weekDay,
                startTime,
                endTime
            };

            await this.showBusiness.bookShow(input);

            res.status(201).send({message: "Show marcado !"});
        } catch (error: any) {
            res.status(400).send({ error: error.message });
        };

        await BaseDatabase.destroyConnection();
    };

};

