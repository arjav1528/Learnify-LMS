import { connectToDatabase } from "@/lib/mongodb";
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
    }catch (error) {
        console.error("Database connection error:", error);
        return NextResponse.json({
            message: "Database connection failed",
            error: error,
        }, { status: 500 });
    }
}