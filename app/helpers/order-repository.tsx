import { Order, OrderItem, Prisma, PrismaClient } from "@prisma/client";
import { IPaginatedList } from "./menu-repository";

const prisma = new PrismaClient({
});


export const orderRepo = {
    getByPage: async (page: number = 1, itemsPerPage : number = 5) => {
        const items = await prisma.order.findMany({
            skip: (page - 1) * itemsPerPage,
            take: itemsPerPage,
            include: {
                orderItems : {
                    include : {
                        menuItem : true
                    }
                }
            }
        });

        const totalItems = await prisma.order.count();
        const totalPages = Math.floor(totalItems / itemsPerPage) + (totalItems % itemsPerPage > 0 ? 1 : 0)

        var res : IPaginatedList<Order> = {
            page,
            itemsPerPage,
            totalItems,
            totalPages,
            items
        }

        return res;

    },
    create,
};

export interface OrderAddressDto {
    streetAddress: string
    apartment: string
    island: string
}

export interface OrderItemDto 
{
    menuItemId: number | undefined
    quantity: number
    price: number
}

export interface OrderDto {
    items: OrderItemDto[]
    deliveryMode: number,
    deliveryAddress: OrderAddressDto | undefined
}

async function create(orderDto: OrderDto) 
{

//     id Int @id @default(autoincrement())
//   orderItems OrderItem[]
//   deliveryMode Int
//   deliveryAddress Json?
//   createdAt DateTime
//   updatedAt DateTime


// id Int @id @default(autoincrement())
// order Order @relation(fields: [orderId], references: [id])
// orderId Int
// menuItem MenuItem? @relation(fields: [menuItemId], references: [id])
// menuItemId Int?
// price Decimal
// quantity Int

    let addr = undefined;

    if(orderDto.deliveryAddress) {
        addr = {...orderDto.deliveryAddress} as Prisma.JsonObject
    }

    var order =  {
        id: undefined,
        createdAt: new Date(),
        updatedAt: new Date(),
        deliveryMode: orderDto.deliveryMode,
        deliveryAddress: addr,
    }

    var res = await prisma.order.create({ data: order })

    orderDto.items.forEach(async i => {
        const orderItem = {
            id: undefined,
            orderId: res.id,
            menuItemId: i.menuItemId,
            price: i.price,
            quantity: i.quantity
        }
        let orderItemRes = await prisma.orderItem.create({data: orderItem}); 
    })
    

}
