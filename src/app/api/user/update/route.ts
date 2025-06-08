"use server";

import { clerkClient } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req : NextRequest){
    const { firstName, lastName, role, bio, userId } = await req.json();

    if (!userId) {
        return new NextResponse("User not found", { status: 404 });
    }

    const client = await clerkClient();
    const updatedUser = await client.users.updateUser(userId, {
        firstName: firstName,
        lastName: lastName,
        unsafeMetadata: {
            role: role,
            bio: bio,
        },
    });

    if(!updatedUser) {
        return new NextResponse("Failed to update user", { status: 500 });
    }

    return new NextResponse("Success", { status: 200 });

}