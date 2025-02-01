import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// inject some dummy data for salesmen table in database
export const GET = async (request: NextRequest) => {
    await prisma.salesMen.createMany({
        data: [
            { name: "Tim Joe", email: "TimJoe@gmail.com" },
            { name: "Peter Jackson", email: "PeterJackson@gmail.com" },
            { name: "Mike Timber", email: "MikeTimber@gmail.com" },
            { name: "Allen Black", email: "AllenBlack@gmail.com" },
            { name: "Elon Musk", email: "ElonMusk@gmail.com" },
        ],
    });
    return "OK";
};
