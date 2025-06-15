import { connectToDatabase } from '@/lib/mongodb';
import { v2 as cloudinary } from 'cloudinary';
import { NextRequest, NextResponse } from 'next/server';



interface CloudinaryUploadResult {
    public_id: string;
    [key: string]: any;
}


export async function POST(req: NextRequest){

    try{
        const formData = await req.formData();
        const file = formData.get('file') as File;

        if(!file || !(file instanceof File)) {
            return new NextResponse("File is required", { status: 400 });
        }


        const buffer = Buffer.from(await file.arrayBuffer());

        const uploadResult : CloudinaryUploadResult = await new Promise<CloudinaryUploadResult>((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                {
                    resource_type: 'auto',
                    folder: 'learnify/courses',
                    public_id: file.name.replace(/\.[^/.]+$/, ""), // Remove file extension for public_id
                },
                (error, result) => {
                    if (error) {
                        console.error("Cloudinary upload error:", error);
                        reject(error);
                    }
                    else {
                        resolve(result as CloudinaryUploadResult);
                    }
                }
            ).end(buffer);
        });
        const title = formData.get('title')?.toString() || '';
        if (!title.trim()) {
            return new NextResponse("Title is required", { status: 400 });
        }
        const courseData = {
            title,
            description: formData.get('description')?.toString() || '',
            instructorId: formData.get('instructorId')?.toString() || '',
            thumbnail: uploadResult.public_id,
            price: parseFloat(formData.get('price')?.toString() || '0'),
            category: formData.get('category')?.toString() || '',
            level: formData.get('level')?.toString() || '',
            slug: '', // This will be set later
        };

        const slug = courseData.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric characters with hyphens
            .replace(/^-|-$/g, ''); // Remove leading and trailing hyphens

        courseData.slug = slug;
        const client = await connectToDatabase();
        const collection = client.db("learnify").collection("courses");
        const existingCourse = await collection.findOne({
            slug: slug
        });

        if (existingCourse) {
            return new NextResponse("Course with this slug already exists", { status: 400 });
        }
        const result = await collection.insertOne(courseData);
        if (result.acknowledged) {
            return new NextResponse(JSON.stringify({ message: "Course created successfully", courseId: result.insertedId }), {
                status: 201,
                headers: {
                    "Content-Type": "application/json",
                },
            });
        }
        return new NextResponse("Failed to create course", { status: 500 });

    } catch (error) {
        console.error("Error processing form data:", error);
        return new NextResponse("Error processing form data", { status: 500 });
    }

}