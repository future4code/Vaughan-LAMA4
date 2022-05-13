import { BaseDatabase } from "./BaseDatabase";
import { User } from "../Model/User";
import { Band } from "../Model/Band";

export class BandDatabase extends BaseDatabase {

    private static TABLE_NAME = "LAMA_BANDS";

    public async createBand(
        id: string,
        name: string,
        genre: string,
        responsible: string,
    ): Promise<void> {
        try {
            await BaseDatabase.connection
                .insert({
                    id,
                    name,
                    music_genre: genre,
                    responsible
                })
                .into(BandDatabase.TABLE_NAME);
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    };


    public async findBandByName(name: string): Promise<Band | undefined> {
        const result = await BaseDatabase.connection
            .select("*")
            .from(BandDatabase.TABLE_NAME)
            .where({ name });

        if (!result.length) {
            return undefined
        }

        return new Band(result[0].id, result[0].name, result[0].genre, result[0].responsible);
    }
}
