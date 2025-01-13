import config from "../config/config";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Sevice{
    client = new Client();
    databases;
    bucket;
    constructor(){
        this.client
        .setEndpoint(config.appwriteUrl)
        .setProject(config.appwriteProjectId);

        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            return await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                ID.unique(),
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            );
        } catch (err) {
            throw err;
        }
    }
    

    async updatePost(slug, {title, content, featuredImage, status}){
        try{
            return await this.databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
        }catch(err){
            throw err;
        }
    }

    async deletePost(slug){
        try{
            await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
            )
            return true;

        }catch(err){
            throw err;
            return false;
        }
    }

    async getPost(slug){
        try{
            return await this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug, 
            )
        }catch(err){
            throw err;
            return false;
        }
    }

    async getPosts(queries = [ Query.equal("status","active")]){
        try{

            return await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                queries,

            )

        }catch(err){
            throw err;
            return false;
        }
    }

    // File upload services:

    async uploadFile(file){
        try{

            return await this.bucket.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file
            )

        }catch(err){
            throw err;
            return false;
        }
    }

    async deleteFile(fileId){
        try{
            await this.bucket.deleteFile(
                config.appwriteBucketId,
                fileId
            )
            return true;

        }catch(err){
            throw err;
        }
        return false;
    }

    async getFilePreview(fileId) {
        try {
          const response = await this.bucket.getFilePreview(
            config.appwriteBucketId,
            fileId,
          );
        //   console.log('File preview response:', response); // Debug log
          return response;
        } catch (error) {
          console.error("Error fetching file preview:", error);
          return null; // Graceful fallback
        }
      }
      
}

const service = new Sevice();

export default service;