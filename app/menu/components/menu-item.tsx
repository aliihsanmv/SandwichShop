import Rating from "@/app/components/rating";
import { IMenuItem } from "@/app/helpers/menu-repository";
import { AddCartForm } from "./add-cart-form";
import Image from 'next/image';

export default function MenuItem({id, name, price, description, photoUrl} : IMenuItem) {

    return <div className="card card-compact w-52 bg-base-100 shadow-xl">
    <figure><Image src={photoUrl} width={500} height={500} alt="Shoes" className="h-44 object-cover w-full"/></figure>
    <div className="card-body">
      <div className="card-actions justify-end">
        <AddCartForm itemId={id ?? 0} />
      </div>
      <div>
        <Rating />
      </div>
      <h2 className="card-title">
        {name} <small>{price.toFixed(2)}</small>
      </h2>
      <p>{description}</p>
      <p>
        Ingredients
      </p>



        <ul className="list-disc ml-5">
            <li>Bread</li>
            <li>Cheese</li>
            <li>Tomato</li>
        </ul>
    </div>
  </div>

}