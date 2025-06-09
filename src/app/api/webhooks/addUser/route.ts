import { connectToDatabase } from "@/lib/mongodb";
import { Role, UserProfile } from "@/models/models";
import { WebhookEvent } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { Webhook } from "svix";


const dummy = {
    "id": "user_2yE06IFCFf4o90ue0Z6PYeWvgGv",
    "object": "user",
    "username": null,
    "first_name": "Arjav",
    "last_name": "Patel",
    "image_url": "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18yeUUwNkxVbGlHTm1HMGk2Y3ppN2pxYzhQdUcifQ",
    "has_image": true,
    "primary_email_address_id": "idn_2yE05oxSaTZvuz7WUuNTPYG2BWM",
    "primary_phone_number_id": null,
    "primary_web3_wallet_id": null,
    "password_enabled": false,
    "two_factor_enabled": false,
    "totp_enabled": false,
    "backup_code_enabled": false,
    "email_addresses": [
      {
        "id": "idn_2yE05oxSaTZvuz7WUuNTPYG2BWM",
        "object": "email_address",
        "email_address": "arjav1528@gmail.com",
        "reserved": false,
        "verification": {
          "status": "verified",
          "strategy": "from_oauth_google",
          "attempts": null,
          "expire_at": null
        },
        "linked_to": [
          {
            "type": "oauth_google",
            "id": "idn_2yE05nT1GRHjb6vnCK6iz6I937r"
          }
        ],
        "matches_sso_connection": false,
        "created_at": 1749384244345,
        "updated_at": 1749384248807
      }
    ],
    "phone_numbers": [],
    "web3_wallets": [],
    "passkeys": [],
    "external_accounts": [
      {
        "object": "external_account",
        "id": "eac_2yE05moo5zAW224nvX1geL5P76x",
        "provider": "oauth_google",
        "identification_id": "idn_2yE05nT1GRHjb6vnCK6iz6I937r",
        "provider_user_id": "107895751011250679587",
        "approved_scopes": "email https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid profile",
        "email_address": "arjav1528@gmail.com",
        "first_name": "Arjav",
        "last_name": "Patel",
        "avatar_url": "https://lh3.googleusercontent.com/a/ACg8ocJ9wnHo70KEOJG1beVEiq0NXiBEUOOImJXwKjZfC_oLuOjNGZPbuw=s1000-c",
        "image_url": "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NKOXduSG83MEtFT0pHMWJlVkVpcTBOWGlCRVVPT0ltSlh3S2paZkNfb0x1T2pOR1pQYnV3PXMxMDAwLWMiLCJzIjoiZXlRelZwdHA5YlBkckVXSkxvemtGQVU1SG5XUTBWbzY4UU1wa2FZb2tUWSJ9",
        "username": null,
        "phone_number": null,
        "public_metadata": {},
        "label": null,
        "created_at": 1749384244340,
        "updated_at": 1749384244340,
        "verification": {
          "status": "verified",
          "strategy": "oauth_google",
          "attempts": null,
          "expire_at": 1749384837116
        }
      }
    ],
    "saml_accounts": [],
    "enterprise_accounts": [],
    "public_metadata": {},
    "private_metadata": {},
    "unsafe_metadata": {
      "bio": "I want to teech peopleee",
      "role": "student"
    },
    "external_id": null,
    "last_sign_in_at": 1749384248811,
    "banned": false,
    "locked": false,
    "lockout_expires_in_seconds": null,
    "verification_attempts_remaining": 100,
    "created_at": 1749384248799,
    "updated_at": 1749384259895,
    "delete_self_enabled": true,
    "create_organization_enabled": true,
    "last_active_at": 1749384248798,
    "mfa_enabled_at": null,
    "mfa_disabled_at": null,
    "legal_accepted_at": null,
    "profile_image_url": "https://images.clerk.dev/oauth_google/img_2yE06LUliGNmG0i6czi7jqc8PuG"
}

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
