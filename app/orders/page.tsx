import { orderRepo } from "../helpers/order-repository";
import Pagination from "../components/pagination";
import Order from "./components/order";

export default async function MenuPage({ searchParams }
    : { searchParams: { [key: string]: string | string[] | undefined }}) {

    const page = searchParams['page'] ?? '1';

    const paginatedList = await orderRepo.getByPage(Number(page));

    return <main className="flex min-h-screen flex-col items-center justify-top">
            <h1 className="font-bold pt-3">Orders</h1>
            <br />
            <section className="flex flex-row justify-center min-w-full flex-wrap gap-5">
                {
                    paginatedList.items.map(m => (
                        <>
                            <Order {...m} />
                        </>
                    ))
                }
            </section>
            <Pagination {...paginatedList} />
        </main>;
    
}