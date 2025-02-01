"use client";
import { useContext, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Card, CardContent } from "@/components/shadcn/Card";
import { Button } from "@/components/shadcn/Button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/shadcn/Form";
import { TbLoader } from "react-icons/tb";
import { formContext } from "@/providers/InquiryFormContextProvider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/shadcn/Select";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/shadcn/UseToast";

const sourceOptions = ["Google", "Social Media", "Friends"];
const stepTwoFormSchema = z.object({
    inquirySource: z.string({ required_error: "This field is required" }).refine((v) => sourceOptions.includes(v)),
});

export default function LeadCollectingForm() {
    const InquiryForm = useContext(formContext);
    const router = useRouter();
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);

    const form_stepTwo = useForm<z.infer<typeof stepTwoFormSchema>>({
        resolver: zodResolver(stepTwoFormSchema),
    });

    const onSubmit = async (values: z.infer<typeof stepTwoFormSchema>) => {
        const fullname = InquiryForm.value.fullname || "";
        const email = InquiryForm.value.email || "";
        const inquirySource = values.inquirySource;
        setLoading(true);

        const R = await fetch(`/api/save-user-inquiry`, {
            method: "POST",
            body: JSON.stringify({
                fullname,
                email,
                inquirySource,
            }),
        })
            .then((response) => response)
            .catch((error) => new Response(error, { status: 500, statusText: "Internal Error" }));

        if (R.status >= 400) {
            toast({ title: "Error", description: R.statusText, variant: "destructive" });
            return;
        }

        setLoading(false);
        router.push("/inquiry-submistion/thank-you");
    };

    return (
        <>
            <Card className="w-full max-w-96">
                <Form {...form_stepTwo}>
                    <CardContent className="flex flex-col items-center gap-6 w-full p-8">
                        <form onSubmit={form_stepTwo.handleSubmit(onSubmit)} className="space-y-8 w-full">
                            <div className="flex flex-col gap-2">
                                <h1 className="text-3xl font-bold">Submit new inquiry</h1>
                                <p className="text-sm opacity-75  text-pretty">Where do you find us!</p>
                            </div>
                            <div className="flex flex-col items-center gap-4 w-full" key="enter">
                                <FormField
                                    control={form_stepTwo.control}
                                    name="inquirySource"
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            {/* <FormLabel>Select an option form the list</FormLabel> */}
                                            <Select onValueChange={field.onChange}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select an option form the list" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {sourceOptions.map((item) => (
                                                        <SelectItem value={item} key={item}>
                                                            {item}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <Button className="w-full py-6" type="submit" disabled={loading}>
                                    {loading ? <TbLoader className="animate-spin" size="1.25rem" /> : "Submit"}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Form>
            </Card>
        </>
    );
}
