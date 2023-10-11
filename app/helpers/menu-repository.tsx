import { MenuItem, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export interface IMenuItem {
    id?: number;
    name: string;
    description: string;
    price: number;
    photoUrl: string;
}

export interface IPaginatedList<IPaginatable> {
    page: number,
    itemsPerPage: number,
    totalItems: number,
    totalPages: number
    items: IPaginatable[]
}

export default interface IPaginatable {

}


export const menuRepo = {
    getAll: async () => await prisma.menuItem.findMany(),
    // getById: (id : number) => menuItems.find(x => x.id?.toString() === id.toString()),
    // find: (x: any) => menuItems.find(x),
    getByPage: async (page: number = 1, itemsPerPage : number = 5) => {
        const items = await prisma.menuItem.findMany({
            skip: (page - 1) * itemsPerPage,
            take: itemsPerPage
        });

        const totalItems = await prisma.menuItem.count();
        const totalPages = Math.floor(totalItems / itemsPerPage) + (totalItems % itemsPerPage > 0 ? 1 : 0)

        var res : IPaginatedList<MenuItem> = {
            page,
            itemsPerPage,
            totalItems,
            totalPages,
            items
        }

        return res;

    },
    create,
    update,
    delete: _delete
};

async function create(menuItem : IMenuItem) 
{
    menuItem.id = undefined;
    const res = await prisma.menuItem.create({data: menuItem});
}

function update(id: number, params: IMenuItem) {

}


function _delete(id: number) {

}
