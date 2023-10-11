import { orderRepo } from "../helpers/order-repository";
import Pagination from "../menu/components/pagination";

export default async function MenuPage({ searchParams }
    : { searchParams: { [key: string]: string | string[] | undefined }}) {

    const page = searchParams['page'] ?? '1';

    const paginatedList = await orderRepo.getByPage(Number(page));

    return <main className="flex min-h-screen flex-col items-center justify-top p-24 bg-slate-300">
            <h1>Orders</h1>
            <p>{ paginatedList.items.length }</p>
            <br />
            {/* <MenuItemForm /> */}
            <br />
            <section className="flex flex-row justify-center min-w-full flex-wrap gap-5">
                {
                    paginatedList.items.map(m => (
                        <p>
                        {JSON.stringify(m.deliveryAddress)}, {m.deliveryMode}, {m.id}
                        </p>
                    ))
                }
            </section>
            <Pagination {...paginatedList} />
        </main>;
    
}