import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
    const leadsList = await prisma.leads.findMany();
    return NextResponse.json(leadsList);
};
