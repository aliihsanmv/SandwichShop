"use client"
import { IPaginatedList } from "@/app/helpers/menu-repository";
import { MenuItem } from "@prisma/client";
import Link from 'next/link'

export default function Pagination(paginatedList : IPaginatedList<MenuItem>) {

    const pagesArray = [...Array(paginatedList.totalPages)]

    return <div>
        {
            pagesArray.map((e, i) => 
                <Link href={`?page=${i+1}`}>{i+1}</Link>
                // <button onClick={ () => {
                //         router.push(`/?page=${i}`)
                //     }
                // }>{ i + 1}</button>
            )
        }
        {/* {paginatedList.totalPages} */}
    </div>
}