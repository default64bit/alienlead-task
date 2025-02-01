"use client";
import { useContext, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { formContext } from "@/providers/InquiryFormContextProvider";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/shadcn/Card";
import { Input } from "@/components/shadcn/Input";
import { Button } from "@/components/shadcn/Button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/shadcn/Form";
import { TbLoader } from "react-icons/tb";

const stepOneFormSchema = z.object({
    fullname: z.string({ required_error: "This field is required" }),
    email: z.string({ required_error: "This field is required" }).email("This is not a valid email address"),
});

export default function LeadCollectingForm() {
    const InquiryForm = useContext(formContext);
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const form_stepOne = useForm<z.infer<typeof stepOneFormSchema>>({
        resolver: zodResolver(stepOneFormSchema),
        defaultValues: { email: "" },
    });

    const onSubmit = async (values: z.infer<typeof stepOneFormSchema>) => {
        setLoading(true);
        InquiryForm.dispatch({ type: "setFormValues", form: values });
        setLoading(false);

        router.push("/inquiry-submistion/step2");
    };

    return (
        <>
            <Card className="w-full max-w-96">
                <Form {...form_stepOne}>
                    <CardContent className="flex flex-col items-center gap-6 w-full p-8">
                        <form onSubmit={form_stepOne.handleSubmit(onSubmit)} className="space-y-8 w-full">
                            <div className="flex flex-col gap-2">
                                <h1 className="text-3xl font-bold">Submit new inquiry</h1>
                                <p className="text-sm opacity-75  text-pretty">Enter your fullname and email address!</p>
                            </div>
                            <div className="flex flex-col items-center gap-4 w-full" key="enter">
                                <FormField
                                    control={form_stepOne.control}
                                    name="fullname"
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormLabel>Fullname</FormLabel>
                                            <FormControl>
                                                <Input placeholder="" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form_stepOne.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormLabel>Email address</FormLabel>
                                            <FormControl>
                                                <Input placeholder="" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button className="w-full py-6" type="submit" disabled={loading}>
                                    {loading ? <TbLoader className="animate-spin" size="1.25rem" /> : "Continue"}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Form>
            </Card>
        </>
    );
}
