import { CartItem, PrismaClient } from "@prisma/client";

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
        include: {cartItems: true}}),
    addItem,
    update,
    delete: _delete
};

async function addItem(cartId: number, itemId: number, quantity: number) 
{
    // const cart = await cartRepo.getById(cartId);
    var cart = await prisma.cart.findFirst();
    if (!cart) 
    {
        cart = await prisma.cart.create({ data: {id: 0, createdAt: new Date()} })
        // return;
    }

    var item = await prisma.menuItem.findFirst({ where: {id: itemId} });
    if (!item) 
    {
        return;
    }

    console.log(cart);

    var cartItem = { 
        id: undefined,
        cartId: cart.id,
        quantity: quantity,
        menuItemId: itemId,
        price: item.price
    };

    console.log(cartItem);

    try {
        var res = await prisma.cartItem.create({ data: cartItem });

    } catch (ex) {
        console.log(ex);
    }



}

function update(id: number, params: IMenuItem) {

}


function _delete(id: number) {

}