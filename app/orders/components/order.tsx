import { IOrder } from "@/app/helpers/order-repository";



export default function OrderItem({id, deliveryAddress, deliveryMode, orderItems} : IOrder)
{
    return (
        <div className="card card-compact bg-base-100 shadow-xl mx-4 my-4">
        <div className="card-body">
            <h3 className="card-title">Order</h3>
            {deliveryAddress?.streetAddress && 
                <p>Delivery Address: {deliveryAddress?.streetAddress}, {deliveryAddress?.apartment}, {deliveryAddress?.island}</p>
            }
            <p>Type: {deliveryMode == 2 ? "Delivery" : "Pickup"}</p>
            <div className="card-actions justify-center">
                
                <div className="overflow-x-auto">
                <table className="table text-base sm:text-xs">
                    {/* head */}
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Qty</th>
                        <th>Total</th>
                    </tr>
                    </thead>
                    <tbody>
                    
                    {
                        orderItems.map(i => (
                            <tr key={i.id}>
                                <td>
                                <div className="flex items-center space-x-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-6 md:w-12 h-12">
                                            <img src={i.menuItem?.photoUrl} alt="Avatar Tailwind CSS Component" />
                                        </div>
                                    </div>
                                    <div>
                                    <div className="font-bold text-xs">{i.menuItem?.name}</div>
                                    <div className="text-sm opacity-50">{i.menuItem?.description.substring(1, 10)}...</div>
                                    <div className="font-bold">{i.price.toFixed(2)}</div>
                                    
                                    </div>
                                </div>
                                </td>

                                <td>
                                    {i.quantity}
                                </td>
                                <th>
                                 {(Number(i.price) * i.quantity).toFixed(2)}
                                </th>
                            </tr>
                        ))
                    }

                    
                    </tbody>
                    {/* foot */}
                    <tfoot>
                    <tr>
                  
                        <th colSpan={4} className="text-right text-xl text-gray-900">
                            {
                                (orderItems.reduce((a, i) => {
                                    return (Number(i.price) * i.quantity) + a;
                                }, 0)).toFixed(2)
                            }
                        </th>
                    </tr>
                    </tfoot>
                    
                </table>
                </div>

            </div>
        </div>
        </div>
      )
}