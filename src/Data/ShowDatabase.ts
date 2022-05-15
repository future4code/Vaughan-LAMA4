import { BaseDatabase } from "./BaseDatabase";
import { User } from "../Model/User";

export class ShowDatabase extends BaseDatabase {

    private static TABLE_NAME = "LAMA_SHOWS";

    public async createShow(
        id: string,
        week_day: string,
        start_time: number,
        end_time: number,
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
                .into(ShowDatabase.TABLE_NAME);
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        };
    };

    public async searchShowsByTime(
        week_day: string,
        start_time: number,
        end_time: number,
    ): Promise<boolean> {
        try {
            const result = await BaseDatabase.connection(ShowDatabase.TABLE_NAME)
                .select("*")
                .where({ week_day })
                .havingBetween("start_time", [start_time, end_time]);

            if (!result.length) {
                return false
            };

            return true;
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        };
    };
};

