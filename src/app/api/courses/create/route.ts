import { connectToDatabase } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";



export async function POST(req : NextRequest){

    try{
        const body = await req.json();
        const { title, slug, description, thumbnail, language, level, categoryId, instructorId, price, tags } = body;


        if (!title || !slug || !description || !thumbnail || !language || !level || !categoryId || !instructorId || price === undefined) {
            return NextResponse.json({
                error: "All fields are required except tags."
            }, { status: 400 });
        }

        if (typeof price !== 'number' || price < 0) {
            return NextResponse.json({
                error: "Price must be a non-negative number."
            }, { status: 400 });
        }
        if (tags && !Array.isArray(tags)) { 
            return NextResponse.json({
                error: "Tags must be an array."
            }, { status: 400 });
        }

        const client = await connectToDatabase();
        const collection = client.db("learnify").collection("courses");


        const course = {
            title,
            slug,
            description,
            thumbnail,
            language,
            level,
            categoryId,
            instructorId,
            price,
            tags: tags || [],
            isPublished: true, // Default to true
            rating: 0, // Default rating
            totalDuration: 0, // Default duration
            createdAt: new Date(),
        };

        const existingCourse = await collection.findOne({
            slug: course.slug,
        });
        if (existingCourse) {
            return NextResponse.json({
                error: "Course with this slug already exists."
            }, { status: 400 });
        }

        const newCourse = await collection.insertOne(course);
        if (!newCourse.acknowledged) {
            return NextResponse.json({
                error: "Failed to create course."
            }, { status: 500 });
        }
        return NextResponse.json({
            message: "Course created successfully.",
            courseId: newCourse.insertedId,
        }, { status: 201 });
    } catch (error) {
        console.error("Error creating course:", error);
        return NextResponse.json({
            error: "Failed to create course."
        }, { status: 500 });
    }
}