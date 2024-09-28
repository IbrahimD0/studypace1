import Groq from "groq-sdk";
import { NextResponse } from "next/server";
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const schema = {
  type: "object",
  properties: {
    topics: {
      type: "array",
      title: "Study Topics",
      description: "A list of topics generated from the user's weekly tasks",
      items: {
        type: "string",
      },
      minItems: 5,
      maxItems: 5,
    },
  },
  required: ["topics"],
};
export async function POST(req: Request) {
  try {
    const { tasks } = await req.json();
    console.log(tasks)
    const chatCompletion = await getGroqChatCompletion(tasks);
    return NextResponse.json(chatCompletion);
  } catch (error) {
    return NextResponse.error();
  }
}

async function getGroqChatCompletion(tasks: string[]) {
  const jsonSchema = JSON.stringify(schema, null, 4);
  return groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `You are an AI assistant designed to analyze and categorize tasks. Your primary function is to process an array of tasks and identify overarching themes or topics that encompass these tasks. You will receive an array of tasks. Your output must be a JSON object that strictly adheres to the following schema:${jsonSchema}. 
Analyze all tasks in the input array.
Identify common themes, areas, or categories that these tasks fall into.
Synthesize these findings into exactly 5 overarching topics.
Ensure that the topics are general enough to potentially relate to multiple tasks but specific enough to be meaningful.
Format your response as a JSON object that strictly follows the provided schema.

Example Output Format:
{
  "topics": [
    "Project Management",
    "Customer Relations",
    "Financial Planning",
    "Technical Development",
    "Marketing Strategy"
  ]
}

Additional Guidelines:
Your output MUST contain a "topics" array with exactly 5 string elements.
Each topic in the array should be a string representing a study topic generated from the user's weekly tasks.
Strive for clarity and conciseness in your topic descriptions.
Avoid overly technical jargon unless it's clearly relevant to the majority of tasks.
Ensure that your topics are mutually distinct while collectively covering the breadth of the input tasks.
If the tasks seem to fall into fewer than 5 distinct categories, use your judgment to create meaningful subdivisions or broader categories to always reach 5 topics.

Remember, your goal is to provide a high-level overview of the main areas of focus represented by the input tasks. Your categorization should help in understanding the general scope and nature of the work described by the task list, while strictly adhering to the provided schema and always generating exactly 5 topics.`,
      },
      {
        role: "user",
        content: `Generate 5 topics based on these ${tasks}`,
      },
    ],
    model: "mixtral-8x7b-32768",
    temperature: 0,
    stream: false,
    response_format: {
      type: "json_object",
    },
  });
}
