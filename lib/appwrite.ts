import { CreateUserPrams, SignInParams } from "@/type";
import { Account, Client, Databases, ID, Query } from "react-native-appwrite";

export const appwriteConfig = {
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
    platform: "com.vivek.gormandize",
    databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID || "692dc3a20017e9cc0cbd",
    userCollectionId: process.env.EXPO_PUBLIC_APPWRITE_USER_COLLECTION_ID || "user"
}

export const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId)
    .setPlatform(appwriteConfig.platform);

export const account = new Account(client);
export const databases = new Databases(client);

export const createUser = async ({ email, password, name }: CreateUserPrams) => {
    try {
        console.log("Creating user with email:", email);

        const newAccount = await account.create(ID.unique(), email, password, name);
        console.log("Account created:", newAccount.$id);

        if(!newAccount) throw new Error("Failed to create account");

        console.log("Signing in...");

        await signIn({ email, password });

        console.log("Signed in successfully");
        
        const avatarUrl = `${appwriteConfig.endpoint}/avatars/initials?name=${encodeURIComponent(name)}&project=${appwriteConfig.projectId}`;

        console.log("Avatar URL:", avatarUrl);

        console.log("Creating database document...");

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

        console.log("User document created:", newUser.$id);

        return newUser;
    } catch (e: any) {
        console.error("Create user error details:", {
            message: e?.message,
            code: e?.code,
            type: e?.type,
            response: e?.response,
            full: e
        });
        throw new Error(e?.message || e?.toString() || "Failed to create user");
    }
}

export const signIn = async ({ email, password }: SignInParams) => {
    try {
        const session = await account.createEmailPasswordSession(email, password);
        return session;
    } catch (e: any) {
        console.error("Sign in error:", e);
        throw new Error(e?.message || e?.toString() || "Failed to sign in");
    }
}

export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get();

        if(!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        )

        if(!currentUser) throw Error;

        return currentUser.documents[0];
    } catch (e: any) {
        console.error("Get current user error:", e);
        
        throw new Error(e as string);
    }
}