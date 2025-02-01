import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const sourceOptions = ["Google", "Social Media", "Friends"];
const requestBodySchema = z.object({
    fullname: z.string({ required_error: "This field is required" }),
    email: z.string({ required_error: "This field is required" }).email("This is not a valid email address"),
    inquirySource: z.string({ required_error: "This field is required" }).refine((v) => sourceOptions.includes(v)),
});
type RequestBody = z.infer<typeof requestBodySchema>;

export const POST = async (req: NextRequest) => {
    const body = await req.json();
    let parsedBody: RequestBody;

    // validated request body
    try {
        parsedBody = requestBodySchema.parse(body);
    } catch (e) {
        if (e instanceof z.ZodError) return NextResponse.json({ error: "Validation failed", issues: e.errors }, { status: 422 });
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }

    await prisma.leads.create({
        data: {
            name: parsedBody.fullname,
            email: parsedBody.email,
            source: parsedBody.inquirySource,
        },
    });

    return new NextResponse("", { status: 200 });
};
