const fs = require('fs');
import path from 'path';
import { PrismaClient } from '@prisma/client';

const jsonDirectory = path.join(process.cwd(), 'app/data');
const primsa = new PrismaClient();


export interface IMenuItem {
    id?: number;
    name: string;
    description: string;
    price: number;
    photoUrl: string;
}


export const menuRepo = {
    getAll: async () => await primsa.menuItem.findMany(),
    // getById: (id : number) => menuItems.find(x => x.id?.toString() === id.toString()),
    // find: (x: any) => menuItems.find(x),
    create,
    update,
    delete: _delete
};

async function create(menuItem : IMenuItem) 
{
    menuItem.id = undefined;
    const res = await primsa.menuItem.create({data: menuItem});
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