import { IMenuItem } from "@/app/helpers/menu-repository";
import { IOrder, OrderAddressDto } from "@/app/helpers/order-repository";
import { Order } from "@prisma/client";



export default function MenuItem({id, deliveryAddress, deliveryMode, orderItems} : IOrder)
{
    return (
        <div className="w-max bg-slate-300 border-solid">
            <p>
                Order
            </p>
            <p>
                {deliveryAddress?.apartment}, {deliveryAddress?.island}, {deliveryAddress?.streetAddress}
            </p>
            <p>
                {orderItems.map(x => (<span>
                    {Number(x.price)}
                </span>))
                }
            </p>
        </div>
      )
}

