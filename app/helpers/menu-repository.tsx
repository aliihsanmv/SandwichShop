const fs = require('fs');
import path from 'path';
import { MenuItem, PrismaClient } from '@prisma/client';

const jsonDirectory = path.join(process.cwd(), 'app/data');
const prisma = new PrismaClient();


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
    // const menuItem = menuItems.find(x => x.id.toString() === id.toString());

    // if(!menuItem) {
    //     return;
    // }

    // // update and save
    // Object.assign(menuItem, params);
    // saveData();
}


function _delete(id: number) {
    // filter out deleted user and save
    // menuItems = menuItems.filter(x => x.id.toString() !== id.toString());
    saveData();
    
}

function saveData() {
    // fs.writeFileSync(jsonDirectory + '/menuItems.json', JSON.stringify(menuItems, null, 4));
}