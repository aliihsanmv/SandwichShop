"use client"
import IPaginatable, { IPaginatedList } from "@/app/helpers/menu-repository";
import { MenuItem } from "@prisma/client";
import Link from 'next/link'


export default function Pagination(paginatedList : IPaginatedList<IPaginatable>) {

    const pagesArray = [...Array(paginatedList.totalPages)]

    return    <div className="join">
        {
            pagesArray.map((e, i) => 
                    <Link className="join-item btn" href={`?page=${i+1}`}>{i+1}</Link>
                )
        }
    </div>
    
}
