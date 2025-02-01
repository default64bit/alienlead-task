"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const sourceOptions = ["Google", "Social Media", "Friends"];
const stepTwoFormSchema = z.object({
    inquirySource: z
        .string({ required_error: "This field is required" })
        .array()
        .refine((val) => val.some((v) => sourceOptions.includes(v))),
});

export default function LeadCollectingForm() {
    const form_stepTwo = useForm<z.infer<typeof stepTwoFormSchema>>({
        resolver: zodResolver(stepTwoFormSchema),
    });

    const onSubmit = async (values: z.infer<typeof stepTwoFormSchema>) => {};

    return <div></div>;
}
