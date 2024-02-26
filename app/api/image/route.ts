import { auth } from "@clerk/nextjs"
import {  NextResponse } from "next/server"
import OpenAI from "openai"


const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY
})

export async function POST(
  req: Request
) {
  try{
    const {userId} = auth();
    const body = await req.json();
    const { prompt, amount = 1, resolution = "512x512 "} = body;

    if (!userId)
    {
      return new NextResponse("Unathorized", {status: 401})
    }

    if(!openai.apiKey) {
      return new NextResponse ("API Key not configured", { status: 500})
    }
    

    if(!prompt) {
      return new NextResponse("prompt are required", {status: 400})
    }

    if(!amount) {
      return new NextResponse("Amount are required", {status: 400})
    }

    if(!resolution) {
      return new NextResponse("Resolution are required", {status: 400})
    }

    const response = await openai.images.generate({
      n: parseInt(amount, 10),
      size: resolution,
      prompt: prompt
    })

    return NextResponse.json(response.data)
  }
  catch (error) {
    console.log("[IMAGE_ERROR]", error)
    return new  NextResponse(`Internal Error: ${error}`, {status: 500})
  }
}