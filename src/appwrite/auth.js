import config from "../config/config";
import { Client, Account, ID } from "appwrite";

export class AuthService{
    client = new Client();
    account;

    constructor(){
        this.client
        .setEndpoint(config.appwriteUrl)
        .setProject(config.appwriteProjectId);

        this.account = new Account(this.client);
    }

    async createAccount({email, password, name}){
        try{
            const userAccount = await this.account.create(
                ID.unique(),
                email,
                password,
                name
            )
            if(userAccount){
                // Call another method
                return await this.login({email, password});
            }
            return userAccount;
        }catch(err){
            throw err;
        }
    }

    async login({email, password}){
        try{
            return await this.account.createEmailPasswordSession(
                email,
                password
            )
        }catch(err){
            throw err;
        }
    }

    async getCurrentUser(){
        try{
           return await this.account.get();
        }catch(err){
            throw err;
        }
        return null;
    }
    async logout(){
        try{
            return await this.account.deleteSessions();
        }catch(err){
            throw err;
        }
    }
}

const authService = new AuthService();// Object is created[class to object conversion]

export default authService;