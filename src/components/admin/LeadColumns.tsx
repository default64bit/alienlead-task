"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../shadcn/Select";

export type Lead = {
    id: string;
    name: string;
    email: string;
    source: string;
    SalesManId?: string;
};

export type SalesMan = {
    id: string;
    name: string;
    email: string;
};

export const columns: ColumnDef<Lead>[] = [
    {
        id: "name",
        header: "name",
        cell: ({ row }) => {
            return <span>{row.original.name}</span>;
        },
    },
    {
        id: "email",
        header: "email",
        cell: ({ row }) => row.original.email,
    },
    {
        id: "source",
        header: "source",
        cell: ({ row }) => row.original.source,
    },
    {
        id: "salesManId",
        header: "sales person",
        cell: ({ row, table }) => {
            const salesMenList: { [key: string]: SalesMan } = {};
            table.options.meta?.extraData?.salesMenList?.forEach((item) => (salesMenList[item.id] = item));
            console.log({ dd: table.options.meta });

            const changeSalesman = async (newSalesmanId: string) => {
                const R = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/assign-salesman-to-lead`, {
                    method: "POST",
                    body: JSON.stringify({
                        leadId: row.original.id,
                        salesmanId: newSalesmanId,
                    }),
                })
                    .then((response) => response)
                    .catch((error) => new Response(error, { status: 500, statusText: "Internal Error" }));

                if (R.status >= 400) {
                    alert(R.statusText);
                    return;
                }

                table.options.meta?.refresh();
            };
            return (
                <>
                    <div className="flex items-center gap-2 max-w-fit">
                        <Select onValueChange={(v) => changeSalesman(v)} defaultValue={salesMenList[row.original.SalesManId || ""]?.id}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select Salesperson" />
                            </SelectTrigger>
                            <SelectContent>
                                {Object.values(salesMenList).map((item) => (
                                    <SelectItem value={item.id} key={item.id}>
                                        {item.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </>
            );
        },
    },
];
