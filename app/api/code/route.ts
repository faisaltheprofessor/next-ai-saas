import { auth } from "@clerk/nextjs"
import {  NextResponse } from "next/server"
import OpenAI from "openai"
import { CreateChatCompletionRequestMessage } from "openai/resources/index.mjs"


const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY
})
const instructionMessage: CreateChatCompletionRequestMessage = {
  role: "system",
  content: "You are a code generatior. You must answer only in markdown code snippets. use code comments for explanations"
}
export async function POST(
  req: Request
) {
  try{
    const {userId} = auth();
    const body = await req.json();
    const {messages} = body;

    if (!userId)
    {
      return new NextResponse("Unathorized", {status: 401})
    }

    if(!openai.apiKey) {
      return new NextResponse ("API Key not configured", { status: 500})
    }
    

    if(!messages) {
      return new NextResponse("Messages are required", {status: 400})
    }

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [instructionMessage, ...messages]
    })

    return NextResponse.json(response.choices[0].message)
  }
  catch (error) {
    console.log("[CODE_ERROR]", error)
    return new  NextResponse("Internal Error", {status: 500})
  }
}