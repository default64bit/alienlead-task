import { Lead, columns } from "@/components/admin/LeadColumns";
import { DataTable } from "@/components/shadcn/DataTable";

const getLeadsList = async () => {
    const R = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/get-leads-list`)
        .then((response) => response)
        .catch((error) => {
            console.error({ error });
            return new Response(error, { status: 500, statusText: "Internal Error" });
        });

    if (R.status >= 400) {
        console.error({ url: R.url, status: R.status, statusText: R.statusText });
        throw Error(`Couldn't get the leads`, { cause: R.status });
    }

    return await R.json();
};
const getSalesMenList = async () => {
    const R = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/get-salesmen-list`)
        .then((response) => response)
        .catch((error) => {
            console.error({ error });
            return new Response(error, { status: 500, statusText: "Internal Error" });
        });

    if (R.status >= 400) {
        console.error({ url: R.url, status: R.status, statusText: R.statusText });
        throw Error(`Couldn't get the salesmen list`, { cause: R.status });
    }

    return await R.json();
};

const LeadListFetcher = async () => {
    const requests = await Promise.allSettled([getLeadsList(), getSalesMenList()]);
    if (requests[0].status === "rejected" || requests[1].status === "rejected") {
        return <>something went wrong</>;
    }

    const reFetchLeads = async (): Promise<Lead[]> => {
        "use server";
        return await getLeadsList();
    };

    return (
        <>
            <DataTable
                columns={columns}
                data={requests[0].value}
                paginationMetadata={{ total: 0, page: 1, pageTotal: 1 }}
                fetcher={reFetchLeads}
                extraData={{ salesMenList: requests[1].value }}
            />
        </>
    );
};

export default LeadListFetcher;
