import { BaseDatabase } from "./BaseDatabase";
import { User } from "../Model/User";

export class UserDatabase extends BaseDatabase {

    private static TABLE_NAME = "LAMA_SHOWS";

    public async createShow(
        id: string,
        week_day: string,
        start_time: string,
        end_time: string,
        band_id: string,
    ): Promise<void> {
        try {
            await BaseDatabase.connection
                .insert({
                    id,
                    week_day,
                    start_time,
                    end_time,
                    band_id
                })
                .into(UserDatabase.TABLE_NAME);
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        };
    };
};

