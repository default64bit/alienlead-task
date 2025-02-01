import type { Metadata } from "next";
import Provider from "../provider";

export const metadata: Metadata = {
    title: "Submit New Inquiry",
    description: "",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <>
            <Provider>{children}</Provider>
        </>
    );
}
