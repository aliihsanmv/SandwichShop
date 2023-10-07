

import { cartRepo } from "../helpers/cart-repository";
import { CheckoutForm } from "./components/checkout-form";
import { RemoveFromCartForm } from "./components/remove-from-cart-form";

export default async function MenuPage({ searchParams }
    : { searchParams: { [key: string]: string | string[] | undefined }}) {


    const cart = await cartRepo.getById(1);
    const cartItems = cart?.cartItems;

    return <main className="flex min-h-screen flex-col items-center justify-top p-24 bg-slate-300">
            <table className="border-collapse border border-slate-400">
                <thead>
                    <tr>
                        <td className="border-collapse border border-slate-100 p-5"></td>
                        <td className="border-collapse border border-slate-100 p-5">Item Name</td>
                        <td className="border-collapse border border-slate-100 p-5">Quantity</td>
                        <td className="border-collapse border border-slate-100 p-5">Price</td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                        {cartItems?.map(c => (
                            <tr>
                                <td className="border-collapse border border-slate-100"><img className="h-12 object-cover w-full" src={c.menuItem.photoUrl}/></td>
                                <td className="border-collapse border border-slate-100 p-5">{c.menuItem.name}</td>
                                <td className="border-collapse border border-slate-100 p-5">{c.quantity}</td>
                                <td className="border-collapse border border-slate-100 text-right p-5">{Number(c.price) * c.quantity}</td>
                                <td><RemoveFromCartForm cartItemId={c.id}></RemoveFromCartForm></td>
                            </tr>
                        ))}
                        <tr>
                            <td className="border-collapse border border-slate-100 text-right p-5" colSpan={4}>{cart?.cartItems.reduce((a, c) => a + Number(c.price) * c.quantity, 0)}</td>
                            <td></td>
                        </tr>
                </tbody>
            </table>
            <CheckoutForm cartId={1} />
        </main>;
    
}