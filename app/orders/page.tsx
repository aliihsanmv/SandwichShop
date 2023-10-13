import { orderRepo } from "../helpers/order-repository";
import Pagination from "../components/pagination";
import Order from "./components/order";

export default async function MenuPage({ searchParams }
    : { searchParams: { [key: string]: string | string[] | undefined }}) {

    const page = searchParams['page'] ?? '1';

    const paginatedList = await orderRepo.getByPage(Number(page));

    return <main className="">
            <h1 className="font-bold pt-3 pl-3">Orders</h1>
            <section className="">
                {
                    paginatedList.items.map(m => (
                        <>
                            <Order key={m.id} {...m} />
                        </>
                    ))
                }
            </section>
            <div className="flex justify-center">
                <Pagination {...paginatedList} />
            </div>
        </main>;
    
}