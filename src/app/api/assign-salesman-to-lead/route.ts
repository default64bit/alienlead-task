import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const requestBodySchema = z.object({
    leadId: z.string({ required_error: "This field is required" }).cuid("this field must be a valid cuid"),
    salesmanId: z.string({ required_error: "This field is required" }).cuid("this field must be a valid cuid"),
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

    const salesman = await prisma.salesMen.findFirst({
        where: { id: parsedBody.salesmanId },
    });
    if (!salesman) return NextResponse.json({ error: "Can't find the salesman" }, { status: 404 });

    await prisma.leads.update({
        where: { id: parsedBody.leadId },
        data: {
            SalesManId: parsedBody.salesmanId,
        },
    });

    return new NextResponse("", { status: 200 });
};
