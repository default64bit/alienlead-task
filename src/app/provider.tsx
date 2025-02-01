"use client";
import InquiryFormContextProvider from "@/providers/InquiryFormContextProvider";
import { ThemeProvider } from "next-themes";
import { memo } from "react";

const Provider = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return (
        // <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <InquiryFormContextProvider>{children}</InquiryFormContextProvider>
        // </ThemeProvider>
    );
};

export default memo(Provider);
