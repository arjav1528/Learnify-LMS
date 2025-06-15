import { connectToDatabase } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req : NextRequest){
    try{
        const { searchParams } = new URL(req.url);
        const instructorId = searchParams.get('instructorId');


        const client = await connectToDatabase();
        const db = client.db('learnify');
        const coursesCollection = db.collection('courses');


        let courses;
        if(!instructorId) {
            courses = await coursesCollection
                .find()
                .sort({ rating: -1 }) // Sort by rating descending
                .toArray();
        }else{
            courses = await coursesCollection
                .find({ instructorId })
                .sort({ rating: -1 })
                .toArray();
        }


        return NextResponse.json({ courses });
    }catch (error) {
        return NextResponse.json({ error: "Failed to fetch courses" }, { status: 500 });
    }
}