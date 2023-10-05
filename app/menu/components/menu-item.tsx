"use client"
import Rating from "@/app/components/rating";
import { CartContext } from "@/app/contexts/cart";
import { useContext, useState } from "react";
import { IMenuItem } from "@/app/helpers/menu-repository";
import { AddCartForm } from "./add-cart-form";

export default function MenuItem({id, name, description} : IMenuItem) {

    const [currentTab, setCurrentTab] = useState<Number>(1);

    let { cart, setCart } = useContext(CartContext);

    function changeTab(tabNumber: Number) {
        setCurrentTab(tabNumber);
    }

    return <article className="w-[250px] border-2 m-2 border-gray-300 bg-white">
                <div>
                    <img className="h-56 object-cover w-full"  
                        src="https://insanelygoodrecipes.com/wp-content/uploads/2021/03/Grilled-Cheese-and-Tomato-Sandwich-683x1024.webp"></img>
                </div>

                <div id="meun-item-buttons" className="flex flex-row justify-between">
                    <button onClick={() => {changeTab(1)}} className="hover:bg-gray-300 text-gray-600 font-bold py-2 px-4">Info</button>
                    <button onClick={() => {changeTab(2)}} className="hover:bg-gray-300 text-gray-600 font-bold py-2 px-4">Ingredients</button>
                    {/* <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4">Add</button> */}
                    <AddCartForm itemId={id ?? 0} />
                </div>

                <div className="p-5">
                    <h2 className="mb-2">{name}</h2>
                    { currentTab == 1 &&   
                        <>
                             <div className="flex gap-2">
                                <Rating></Rating>
                                <span className="text-sm">200 Reviews</span>
                            </div>
                            <a href="#" className="text-sm font-bold">Chinese Chef</a>
                            <p>{description}</p>
                        </>

                    }
                     
                    { currentTab == 2 &&   
                        <>
                            <ul className="list-disc ml-5">
                                <li>Bread</li>
                                <li>Cheese</li>
                                <li>Tomato</li>
                            </ul>
                        </>
                    }
                   
                   <button className="hover:bg-blue-400 w-full hover:text-white p-2 mt-5" onClick={() => { if(setCart != null) { setCart(cart+1) } }}>Details</button>

                </div>
            </article>;
}