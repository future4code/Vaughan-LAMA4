import { ShowsByDayOutputDTO } from "../Model/Show";
import { BandDatabase } from "./BandDatabase";
import { BaseDatabase } from "./BaseDatabase";

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

    public async getShowsByDay(
        week_day: string
    ): Promise<ShowsByDayOutputDTO[]> {
        try {
            const result = await BaseDatabase.connection(ShowDatabase.TABLE_NAME)
                .select("name", "music_genre as genre")
                .where({ week_day })
                .orderBy("start_time", "asc")
                .innerJoin(
                    "LAMA_BANDS",
                    `${ShowDatabase.TABLE_NAME}.band_id`,
                    "=",
                    "LAMA_BANDS.id"
                );

            return result;
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        };
    };
};

