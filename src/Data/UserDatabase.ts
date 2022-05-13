import { BaseDatabase } from "./BaseDatabase";
import { User } from "../Model/User";

export class UserDatabase extends BaseDatabase {

  private static TABLE_NAME = "LAMA_USERS";

  public async createUser(
    id: string,
    name: string,
    email: string,
    password: string,
    role: string
  ): Promise<void> {
    try {
      await BaseDatabase.connection
        .insert({
          id,
          email,
          name,
          password,
          role
        })
        .into(UserDatabase.TABLE_NAME);
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async getUserByEmail(email: string): Promise<User | undefined> {
    const result = await BaseDatabase.connection
      .select("*")
      .from(UserDatabase.TABLE_NAME)
      .where({ email });

      if(!result.length){
        return undefined

      }

    return User.toUserModel(result[0]);
  };

  public async getUserById(id: string): Promise<User | undefined> {
    const result = await BaseDatabase.connection
      .select("*")
      .from(UserDatabase.TABLE_NAME)
      .where({ id });

      if(!result.length){
        return undefined

      }

    return User.toUserModel(result[0]);
  };

};