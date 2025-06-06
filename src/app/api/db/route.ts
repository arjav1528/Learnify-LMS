import { connectToDatabase } from "@/lib/mongoose";
import { NextResponse } from "next/server";


export async function GET(){
    try{
        const client = await connectToDatabase();
        const db = client.db("learnify");

        return NextResponse.json({
            message: "Database connection successful",
            dbName: db.databaseName,
            collections: await db.listCollections().toArray(),
        });
    }catch (error : any) {
        console.error("Database connection error:", error);
        return NextResponse.json({
            message: "Database connection failed",
            error: error.message,
        }, { status: 500 });
    }
}