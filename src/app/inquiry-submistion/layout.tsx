import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Submit New Inquiry",
    description: "",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return <>{children}</>;
}
