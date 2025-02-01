import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
    const salesMenList = await prisma.salesMen.findMany();
    return NextResponse.json(salesMenList);
};
