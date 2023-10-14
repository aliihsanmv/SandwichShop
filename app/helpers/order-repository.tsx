import { Order, OrderItem, Prisma, PrismaClient } from "@prisma/client";
import { IPaginatedList } from "./menu-repository";
import prisma from "@/prisma/db";


export interface IOrder {
    id:number,
    deliveryAddress: any,
    deliveryMode: number,
    orderItems: ({
        menuItem: {
            id: number;
            name: string;
            description: string;
            price: Prisma.Decimal;
            photoUrl: string;
        } | null;
    } & {
        id: number;
        orderId: number;
        menuItemId: number | null;
        price: Prisma.Decimal;
        quantity: number;
    })[];
    
}

export const orderRepo = {
    getByPage: async (sessionId: string, page: number = 1, itemsPerPage : number = 5) => {
        const items = await prisma.order.findMany({
            skip: (page - 1) * itemsPerPage,
            take: itemsPerPage,
            include: {
                orderItems : {
                    include : {
                        menuItem : true
                    }
                }
            },
            where: {
                sessionId: sessionId
            },
            orderBy: {
                createdAt: "desc"
            }
        });

        items[0]

        const totalItems = await prisma.order.count();
        const totalPages = Math.floor(totalItems / itemsPerPage) + (totalItems % itemsPerPage > 0 ? 1 : 0)

        var res : IPaginatedList<IOrder> = {
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
    city: string
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
    sessionId: string
}

async function create(orderDto: OrderDto) 
{

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
        sessionId: orderDto.sessionId
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

