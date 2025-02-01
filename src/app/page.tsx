import { Button } from "@/components/shadcn/Button";
import Link from "next/link";

export default function Home() {
    return (
        <>
            <h1 className="text-3xl font-bold mb-10">Welcome To Lead Management Demo 👋</h1>
            <div className="flex items-center gap-4">
                <Button>
                    <Link href="/inquiry-submistion/step1">+ Submit new inquiry</Link>
                </Button>
                <Button>
                    <Link href="/admin">Admin Panel</Link>
                </Button>
            </div>
        </>
    );
}
