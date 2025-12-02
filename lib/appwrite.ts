import { CreateUserPrams, SignInParams } from "@/type";
import { Account, Client, Databases, ID, Query } from "react-native-appwrite";

export const appwriteConfig = {
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
    platform: "com.vivek.gormandize",
    databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID || "692dc3a20017e9cc0cbd",
    userCollectionId: process.env.EXPO_PUBLIC_APPWRITE_USER_COLLECTION_ID || "user",
    categoriesCollectionId: process.env.EXPO_PUBLIC_APPWRITE_CATEGORIES_COLLECTION_ID || "categories",
    menuCollectionId: process.env.EXPO_PUBLIC_APPWRITE_MENU_COLLECTION_ID || "menu",
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
        console.log("Signing in user:", email);
        console.log("Using endpoint:", appwriteConfig.endpoint);
        console.log("Project ID:", appwriteConfig.projectId);
        
        try {
            console.log("Checking for existing sessions...");
            await account.deleteSession('current');
            console.log("Deleted existing session");
        } catch (e) {
            console.log("No existing session to delete", e);
        }
        
        console.log("Creating new session...");
        const session = await account.createEmailPasswordSession(email, password);
        
        console.log("Sign in session created successfully:", session.$id);
        return session;
    } catch (e: any) {
        console.error("Sign in error:", {
            message: e?.message,
            code: e?.code,
            type: e?.type,
            response: e?.response
        });
        
        throw new Error(e?.message || e?.toString() || "Failed to sign in");
    }
}

export const getCurrentUser = async () => {
    try {
        console.log("Getting current account...");
        
        const timeoutPromise = new Promise((_, reject) => 
            setTimeout(() => reject(new Error("Request timed out")), 20000)
        );
        
        const accountPromise = account.get();
        
        const currentAccount = await Promise.race([accountPromise, timeoutPromise]) as any;

        if(!currentAccount) {
            console.log("No account returned");
            return null;
        }

        console.log("Fetching user document from database...");

        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        )

        console.log("User documents found:", currentUser.documents.length);

        if(!currentUser || currentUser.documents.length === 0) {
            console.log("No user document found in database");
            return null;
        }

        const user = currentUser.documents[0];
        console.log("User retrieved successfully:", {
            name: user.name,
            email: user.email,
            id: user.$id
        });

        return user;
    } catch (e: any) {
        if (e?.message !== "Request timed out" && e?.code !== 401) {
            console.error("Get current user error:", {
                message: e?.message,
                code: e?.code,
                type: e?.type
            });
        }
        
        console.log("No active session - user is not authenticated");

        return null;
    }
}