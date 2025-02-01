import { Button } from "@/components/shadcn/Button";
import Link from "next/link";
import LeadListFetcher from "./LeadList.fetcher";

export default function Home() {
    return (
        <>
            <div className="w-full max-w-screen-2xl p-6">
                <LeadListFetcher />
            </div>
        </>
    );
}
