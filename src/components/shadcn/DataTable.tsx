/* eslint-disable  @typescript-eslint/no-explicit-any */
"use client";
import { ColumnDef, RowData, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/shadcn/Table";
import { Context, createContext, useContext, useEffect, useState } from "react";
import { Button } from "./Button";

declare module "@tanstack/table-core" {
    interface TableMeta<TData extends RowData> {
        refresh: () => void | TData;
        extraData?: any;
    }
}

export interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    paginationMetadata: { total: number; page: number; pageTotal: number };
    fetcher: (...t: any) => Promise<TData[]>;
    queryContext?: Context<{ value: any; dispatch: any }>;
    extraData: any;
}

export function DataTable<TData, TValue>({ columns, data, paginationMetadata, fetcher, queryContext, extraData }: DataTableProps<TData, TValue>) {
    const [tableData, setTableData] = useState(data);
    const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 25 });

    queryContext = queryContext ? queryContext : createContext({ value: undefined, dispatch: () => {} });
    const extraQuery = useContext(queryContext);

    const table = useReactTable<TData>({
        data: tableData,
        columns,
        getCoreRowModel: getCoreRowModel(),
        state: { pagination },
        manualPagination: true,
        rowCount: paginationMetadata.total,
        onPaginationChange: setPagination,
        meta: {
            refresh: () => {
                fetcher({ page: pagination.pageIndex }).then((d) => setTableData(d));
            },
            extraData,
        },
    });

    useEffect(() => {
        fetcher({ page: 1, search: extraQuery?.value?.searchQuery || "" }).then((d) => {
            setTableData(d);
        });
    }, [extraQuery?.value, fetcher]);

    useEffect(() => {
        fetcher({ page: pagination.pageIndex + 1, search: extraQuery?.value?.searchQuery || "" }).then((d) => {
            setTableData(d);
        });
    }, [pagination, fetcher, extraQuery?.value?.searchQuery]);

    useEffect(() => {
        setTableData(data);
    }, [data]);

    return (
        <div className="flex flex-col items-start gap-4 w-full">
            <div className="rounded-md border w-full">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead className="font-extrabold" key={header.id}>
                                            {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center text-rose-600">
                                    no data!
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end gap-2">
                <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                    next page
                </Button>
                <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                    previous page
                </Button>
            </div>
        </div>
    );
}
