import { Cart, CartItem, PrismaClient } from "@prisma/client";
import { OrderAddressDto, OrderDto, OrderItemDto, orderRepo } from "./order-repository";
import prisma from "@/prisma/db";


export interface IMenuItem {
    id?: number;
    name: string;
    description: string;
    price: number;
    photoUrl: string;
    rating: number;
    ingredients: string[]
}

export interface IPaginatedList<T> {
    page: number,
    itemsPerPage: number,
    totalItems: number,
    totalPages: number
    items: T[]
}


export const cartRepo = {
    getById: async (sessionId: string) => await prisma.cart.findFirst({where: {sessionId: sessionId}, 
        include: {
            cartItems: {
                include: {
                    menuItem: true
                }
            }
        }
    }),
    checkout,
    addItem,
    update,
    delete: _delete
};

async function addItem(sessionId: string, itemId: number, quantity: number) 
{
    var cart = await prisma.cart.findFirst({
        include: {
            cartItems: {
            }
        },
        where: {
            sessionId: sessionId
        }
    });

    if (!cart) 
    {
        cart = await prisma.cart.create({ 
            data: 
            {
                id: undefined, 
                createdAt: 
                new Date(), 
                sessionId: sessionId
            }, 
            include: {
                cartItems: 
                {
                }
            } 
        })
        // return;
    }

    var item = await prisma.menuItem.findFirst({ where: {id: itemId} });
    if (!item) 
    {
        return;
    }

    var existingCartItemIndex = await cart.cartItems.findIndex(ci => ci.menuItemId == item?.id);

    if(existingCartItemIndex > -1) 
    {
        var existingCartItem = cart.cartItems[existingCartItemIndex];
        existingCartItem.quantity += quantity;

        try {
            var res = await prisma.cartItem.update({ where: { id: existingCartItem.id },  data: existingCartItem });
    
        } catch (ex) {
            console.log(ex);
        }

    }
    else 
    {
        var cartItem = { 
            id: undefined,
            cartId: cart.id,
            quantity: quantity,
            menuItemId: itemId,
            price: item.price
        };
    
    
        try {
            var res = await prisma.cartItem.create({ data: cartItem });
    
        } catch (ex) {
            console.log(ex);
        }
    }

}

interface ICheckoutResult {
    isSuccess: boolean,
    errorMessage: string
}


async function checkout(sessionId: string, deliveryMode: number, orderAddress: OrderAddressDto) : Promise<ICheckoutResult>
{
    var cart = await cartRepo.getById(sessionId);

    if(cart == null) {
        return { isSuccess: false, errorMessage: "Cart not fouund"};
    }

    if(cart.cartItems.length == 0) {
        return { isSuccess: false, errorMessage: "There are no items in the cart"}; 
    }

    try {

        let orderDto : OrderDto = {
            items: [],
            deliveryMode: deliveryMode,
            deliveryAddress: orderAddress,
            sessionId: sessionId
        }

        let orderItemDto: OrderItemDto[] = [];

        cart.cartItems.forEach(async x => {

            orderItemDto.push({
                menuItemId: x.menuItemId,
                quantity: x.quantity,
                price: Number(x.price)
            });

            var res = await prisma.cartItem.delete({ where: { id: x.id }});

        })

        orderDto.items = orderItemDto;
        
        var orderDtoRes = await orderRepo.create(orderDto);
    
        var res = await prisma.cart.update({where: {id: cart.id}, data: { createdAt: new Date() }})

    } catch (ex) {
        console.log(ex);
        return { isSuccess: false, errorMessage: "Error saving changes"};
    }

    return { isSuccess: true, errorMessage: ""};
}

function update(id: number, params: IMenuItem) {

}


async function _delete(id: number) {

    try {
        var res = await prisma.cartItem.delete({ where: { id: id } });

    } catch (ex) {
        console.log(ex);
    }

}