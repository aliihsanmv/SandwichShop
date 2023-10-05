

import { cartRepo } from "../helpers/cart-repository";

export default async function MenuPage({ searchParams }
    : { searchParams: { [key: string]: string | string[] | undefined }}) {


    const cart = await cartRepo.getById(1);



    return <main className="flex min-h-screen flex-col items-center justify-top p-24 bg-slate-300">
            <table>
                <thead>
                    <tr>
                        <td>Item Name</td>
                        <td>Quantity</td>
                        <td>Price</td>
                    </tr>
                </thead>
                <tbody>
                        {cart?.cartItems.map(c => (
                            <tr>
                            <td>{c.menuItemId}</td>
                            <td>{c.quantity}</td>
                            <td>{Number(c.price)}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </main>;
    
}