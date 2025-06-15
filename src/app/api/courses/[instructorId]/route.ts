import { connectToDatabase } from "@/lib/mongodb";
import { useParams } from "next/navigation";
import { NextRequest } from "next/server";


export async function GET(req : NextRequest, params : { params: { instructorId: string } }) {
    const { instructorId } = await params.params;
    if (!instructorId) {
        return new Response("Instructor ID is required", { status: 400 });
    }
    try{
        const client = await connectToDatabase();
        const collection = client.db("learnify").collection("courses");
        const courses = await collection.find({
            instructorId: instructorId
         }).toArray();
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