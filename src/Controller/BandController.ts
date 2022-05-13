import { Request, Response } from "express";
import { BaseDatabase } from "../Data/BaseDatabase";
import { BandBusiness } from "../Business/BandBusiness";
import { BandInputDTO } from "../Model/Band";

export class BandController {

    constructor(
        private bandBusiness: BandBusiness
    ){};

    public async createBand(req: Request, res: Response){
        try {
            const { name, genre, responsible } = req.body
            const token = req.headers.authorization as string
            const band: BandInputDTO = {
                name,
                genre,
                responsible,
                token 
            }

            await this.bandBusiness.createBand(band)
            res.status(201).send({message: "Banda cadastrada com sucesso !"})
        } catch (error: any) {
            res.status(400).send(error.message)
        }

    }

}