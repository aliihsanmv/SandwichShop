

import MenuItem from "./components/menu-item";
import { IMenuItem, menuRepo } from "../helpers/menu-repository";
import Pagination from "../components/pagination";
import { cartRepo } from "../helpers/cart-repository";
import { orderRepo } from "../helpers/order-repository";

export default async function MenuPage({ searchParams }
    : { searchParams: { [key: string]: string | string[] | undefined }}) {

    const page = searchParams['page'] ?? '1';

    const paginatedList = await menuRepo.getByPage(Number(page));

    const cart = await cartRepo.getById(1);

    const cartCount = cart?.cartItems?.length ?? 0;

    const menuitems: IMenuItem[] = paginatedList.items.map<IMenuItem>(x => {
        return {
            ...x,
            price: Number.parseFloat(x.price.toString())
        }
    });

    const orders = await orderRepo.getByPage();


    return <main className="flex flex-col items-center justify-top px-14">
            <br />
            {/* <MenuItemForm /> */}
            <br />
            <section className="flex flex-row justify-center min-w-full flex-wrap gap-5">
                {
                    menuitems.map(m => (<MenuItem {...m}/>))
                }
            </section>
            <Pagination {...paginatedList} />
        </main>;
    
}