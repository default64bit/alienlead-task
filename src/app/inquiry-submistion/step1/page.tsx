"use client";
import { useContext } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { formContext } from "@/providers/InquiryFormContextProvider";
import { useRouter } from "next/navigation";

const stepOneFormSchema = z.object({
    fullname: z.string({ required_error: "This field is required" }),
    email: z.string({ required_error: "This field is required" }).email("This is not a valid email address"),
});

const sourceOptions = ["Google", "Social Media", "Friends"];
const stepTwoFormSchema = z.object({
    inquirySource: z
        .string({ required_error: "This field is required" })
        .array()
        .refine((val) => val.some((v) => sourceOptions.includes(v))),
});

export default function LeadCollectingForm() {
    const InquiryForm = useContext(formContext);
    const router = useRouter();

    const form_stepOne = useForm<z.infer<typeof stepOneFormSchema>>({
        resolver: zodResolver(stepOneFormSchema),
    });

    const onSubmit = async (values: z.infer<typeof stepOneFormSchema>) => {
        InquiryForm.dispatch({ type: "setFormValues", form: values });
        router.push("/inquiry-submistion/step2");
    };

    return <div></div>;
}
