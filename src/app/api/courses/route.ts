import { connectToDatabase } from "@/lib/mongodb";
import { NextRequest } from "next/server";


export async function GET(req: NextRequest) {

    try{
        const client = await connectToDatabase();
        const collection = client.db("learnify").collection("courses");
        const courses = await collection.find({}).toArray();
        return new Response(JSON.stringify(courses), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.error("Error fetching courses:", error);
        return new Response("Error fetching courses", { status: 500 });
    }
}