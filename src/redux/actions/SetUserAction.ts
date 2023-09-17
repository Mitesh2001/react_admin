import { User } from "../../Models/User";

export const setUser = (user:User) => {
    return {
        type: 'SET_USER',
        user
    }
}