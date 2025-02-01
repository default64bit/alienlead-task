"use client";
import { Card, CardContent } from "@/components/shadcn/Card";
import { Button } from "@/components/shadcn/Button";
import Link from "next/link";
import { TbCheck } from "react-icons/tb";

export default function LeadCollectingForm() {
    return (
        <>
            <Card className="w-full max-w-screen-sm">
                <CardContent className="flex flex-col items-center gap-6 w-full p-8">
                    <span className="bg-lime-700/10 rounded-full p-6">
                        <TbCheck color="lime" size={120} />
                    </span>
                    <div className="flex flex-col items-center gap-1">
                        <h1 className="text-3xl font-bold">Thanks for your submistion!</h1>
                        <p className="opacity-70">We saved your inputs, and will assign a sellsman to you shortly!</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <Button asChild>
                            <Link href="/inquiry-submistion/step1">+ Submit new inquiry</Link>
                        </Button>
                        <Button asChild>
                            <Link href="/">Head to home page</Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </>
    );
}
