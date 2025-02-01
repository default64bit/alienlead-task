import { Suspense } from "react";
import LeadListFetcher from "./LeadList.fetcher";

export default function Home() {
    return (
        <>
            <div className="w-full max-w-screen-2xl p-6">
                <Suspense fallback="Loading...">
                    <LeadListFetcher />
                </Suspense>
            </div>
        </>
    );
}
