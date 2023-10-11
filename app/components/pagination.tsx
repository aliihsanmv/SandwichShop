"use client"
import IPaginatable, { IPaginatedList } from "@/app/helpers/menu-repository";
import { MenuItem } from "@prisma/client";
import Link from 'next/link'
import { useSearchParams  } from 'next/navigation'


export default function Pagination(paginatedList : IPaginatedList<IPaginatable>) {

    const searchParams = useSearchParams();
    let page = searchParams.get('page');
    if(!page) {
        page = "1";
    }

    const pagesArray = [...Array(paginatedList.totalPages)]

    return    <div className="join">
        {
            pagesArray.map((e, i) => 
                    <Link className={ page == (i + 1).toString() ? "join-item btn btn-active" : "join-item btn "} href={`?page=${i+1}`}>{i+1}</Link>
                )
        }
    </div>
    
}
