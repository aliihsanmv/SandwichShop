

import MenuItem from "./components/menu-item";
import { IMenuItem, menuRepo } from "../helpers/menu-repository";
import Pagination from "../components/pagination";
import { orderRepo } from "../helpers/order-repository";
import { MenuItemForm } from "./components/menu-item-form";
import { Prisma } from "@prisma/client";

export default async function MenuPage({ searchParams }
    : { searchParams: { [key: string]: string | string[] | undefined }}) {


    const page = searchParams['page'] ?? '1';

    const paginatedList = await menuRepo.getByPage(Number(page));

    const menuitems: IMenuItem[] = paginatedList.items.map<IMenuItem>(x => {
        var e = x.ingredients as Prisma.JsonArray;
        return {
            ...x,
            rating: Number.parseFloat(x.rating.toString()),
            price: Number.parseFloat(x.price.toString()),
            ingredients: e.map(z => z?.toString() ?? "")
        }
    });


    return <main className="flex flex-col items-center justify-top px-14">
            <br />
            {/* <MenuItemForm /> */}
            <br />
            <section className="flex flex-row justify-center min-w-full flex-wrap gap-5">
                {
                    menuitems.map(m => (<MenuItem key={m.id} {...m}/>))
                }
            </section>
            <Pagination {...paginatedList} />
        </main>;
    
}