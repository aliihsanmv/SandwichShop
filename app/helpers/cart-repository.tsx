import { Cart, CartItem, PrismaClient } from "@prisma/client";
import { OrderAddressDto, OrderDto, OrderItemDto, orderRepo } from "./order-repository";

const prisma = new PrismaClient({
    // log: ['query', 'info', 'warn', 'error'],
});


export interface IMenuItem {
    id?: number;
    name: string;
    description: string;
    price: number;
    photoUrl: string;
}

export interface IPaginatedList<T> {
    page: number,
    itemsPerPage: number,
    totalItems: number,
    totalPages: number
    items: T[]
}


export const cartRepo = {
    getById: async (id: number) => await prisma.cart.findFirst({where: {id: id}, 
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

async function addItem(cartId: number, itemId: number, quantity: number) 
{
    // const cart = await cartRepo.getById(cartId);
    var cart = await prisma.cart.findFirst({
        include: {
            cartItems: {
            }
        }
    });

    if (!cart) 
    {
        cart = await prisma.cart.create({ data: {id: 0, createdAt: new Date()}, include: {
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



async function checkout(cartId: number, orderAddress: OrderAddressDto) 
{
    var cart = await cartRepo.getById(cartId);

    if(cart == null) {
        return;
    }

    try {

        let orderDto : OrderDto = {
            items: [],
            deliveryMode: 1,
            deliveryAddress: orderAddress,
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
        var res = await prisma.cart.update({where: {id: cartId}, data: { createdAt: new Date() }})

    } catch (ex) {
        console.log(ex);
    }
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