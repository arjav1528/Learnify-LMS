import { connectToDatabase } from "@/lib/mongodb";
import { Role, UserProfile } from "@/models/models";
import { WebhookEvent } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { Webhook } from "svix";




export async function POST(req: NextRequest) {

    const ADD_USER_WEBHOOK = process.env.ADD_USER_WEBHOOK || "";

    if(!ADD_USER_WEBHOOK){
        return new NextResponse("Webhook not found", { status: 404 });
    }

    const headerPayload = await headers();

    const svix_id = headerPayload.get('svix-id');
    const svix_timestamp = headerPayload.get('svix-timestamp');
    const svix_signature = headerPayload.get('svix-signature');

    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new NextResponse("Headers missing", { status: 400 });
    }

    const payload = await req.text();
    
    const webhook = new Webhook(ADD_USER_WEBHOOK);
    
    let evt: any;

    try {
      evt = webhook.verify(payload, {
        'svix-id': svix_id,
        'svix-timestamp': svix_timestamp,
        'svix-signature': svix_signature,
      }) as WebhookEvent;
    } catch (err) {
      console.error('Error verifying webhook:', err);
      return new NextResponse('Error verifying webhook', { status: 400 });
    }

    const client = await connectToDatabase();

    const collection = client.db("learnify").collection("users");

    if(!collection){
        return new NextResponse("Collection not found", { status: 404 });
    }

    const existingUser = await collection.findOne({
        clerkId: evt.data.id,
    });

    if(existingUser){
        return new NextResponse("User already exists", { status: 400 });
    }

    const role : Role = evt.data.unsafe_metadata.role as Role || "student";

    const user : UserProfile = {
        clerkId: evt.data.id || "",
        firstName : evt.data.id || "",
        lastName : evt.data.id || "",
        email: evt.data.email_addresses?.[0]?.email_address || "",
        role : role,
        bio : evt.data.unsafe_metadata.bio || "",
        createdAt: new Date(evt.data.created_at)
    }

    const result = await collection.insertOne(user);

    if(!result){
        return new NextResponse("Error creating user", { status: 400 });
    }

    return new NextResponse("User created", { status: 200 });
    
}

export async function GET(req: NextRequest) {
    return new NextResponse(
        JSON.stringify({
            message: "Hello World",
        }),
        { status: 200 }
    );
}