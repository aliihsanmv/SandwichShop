

import { cartRepo } from "../helpers/cart-repository";
import { CheckoutForm } from "./components/checkout-form";
import { RemoveFromCartForm } from "./components/remove-from-cart-form";

export default async function MenuPage({ searchParams }
    : { searchParams: { [key: string]: string | string[] | undefined }}) {


    const cart = await cartRepo.getById(1);
    const cartItems = cart?.cartItems;


    return (
        <>
        
        <div className="card card-compact bg-base-100 shadow-xl mx-4 mt-5">
        <div className="card-body">
            <h3 className="card-title">Cart</h3>
            <div className="card-actions justify-center">
                
                <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Total</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    
                    {
                        cartItems?.map(i => (
                            <tr>
                                <td key={i.id}>
                                <div className="flex items-center space-x-3">
                                    <div className="avatar">
                                    <div className="mask mask-squircle w-12 h-12">
                                        <img src={i.menuItem?.photoUrl} alt="Avatar Tailwind CSS Component" />
                                    </div>
                                    </div>
                                    <div>
                                    <div className="font-bold">{i.menuItem?.name}</div>
                                    <div className="text-sm opacity-50">{i.menuItem?.description}</div>
                                    </div>
                                </div>
                                </td>

                                <td>
                                    {i.quantity}
                                </td>
                                <td>
                                    {i.price.toFixed(2)}
                                </td>
                                <th>
                                 {(Number(i.price) * i.quantity).toFixed(2)}
                                </th>
                                <td><RemoveFromCartForm cartItemId={i.id}></RemoveFromCartForm></td>
                            </tr>
                        ))
                    }

                    
                    </tbody>
                    {/* foot */}

                    
                </table>
                </div>
            </div>
            <div className="flex justify-center">
                <CheckoutForm cartId={1} />
            </div>
        </div>
        </div>
    
        </>
        );

    
}