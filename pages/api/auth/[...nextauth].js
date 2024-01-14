import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import {MongoDBAdapter} from "@next-auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";

const adminEmails=['anandhuae03@gmail.com'];

export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
            prompt: 'select_account',
        }),
    ],
    adapter: MongoDBAdapter(clientPromise),
    callbacks: {
        session : ({session,token,user}) => {
            console.log({session,token,user});
            if(adminEmails.includes(session?.user?.email)){
            return session;
            } else {
                return false;
            }
        },
    },
})