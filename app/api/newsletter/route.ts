import { NextResponse } from "next/server";
import { z } from "zod";
import { connectMongo } from "@/lib/mongodb";
import NewsletterSubscriber from "@/models/NewsletterSubscriber";

const schema = z.object({ email: z.email().max(254) });
export async function POST(request: Request) { const parsed=schema.safeParse(await request.json().catch(()=>null));if(!parsed.success)return NextResponse.json({error:"Enter a valid email address."},{status:400});if(!process.env.MONGODB_URI)return NextResponse.json({ok:true,demo:true},{status:202});try{await connectMongo();await NewsletterSubscriber.updateOne({email:parsed.data.email.toLowerCase()},{$set:{active:true},$setOnInsert:{source:"website"}},{upsert:true});return NextResponse.json({ok:true},{status:201});}catch{return NextResponse.json({error:"The newsletter is unavailable right now."},{status:503});} }
