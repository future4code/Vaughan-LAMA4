import { UserRole } from "../Model/User"

export type authenticationData = {
    id: string,
    role?: UserRole
}