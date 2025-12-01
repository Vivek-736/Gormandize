import { CreateUserPrams, SignInParams } from "@/type";
import { Account, Avatars, Client, Databases, ID } from "react-native-appwrite"

export const appwriteConfig = {
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
    projectName: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_NAME,
    platform: "com.vivek.gormandize",
    databaseId: "692dc3a20017e9cc0cbd",
    userCollectionId: "user"
}

export const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId)
    .setPlatform(appwriteConfig.platform);

export const account = new Account(client);
export const databases = new Databases(client);
const avatars = new Avatars(client);

export const createUser = async ({ email, password, name }: CreateUserPrams) => {
    try {
        const newAccount = await account.create(ID.unique(), email, password, name);

        if(!newAccount) throw Error;

        await signIn({ email, password });
        
        const avatarUrl = avatars.getInitials(name);

        const newUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                name: name,
                email: email,
                avatar: avatarUrl
            }
        )

        return newUser;
    } catch (e) {
        throw new Error(e as string);
    }
}

export const signIn = async ({ email, password }: SignInParams) => {
    try {
        const session = await account.createEmailPasswordSession(email, password);
    } catch (e) {
        throw new Error(e as string);
    }
}