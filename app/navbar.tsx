import Link from 'next/link'
import React from 'react'



export default function Navbar () {

  return (
    <div className="navbar bg-base-100">
        <div className="flex-1">
            <Link className="btn btn-ghost normal-case text-xl" href='/menu'>Sandwitch Shop</Link>
        </div>
        <div className="flex-none">
            <ul className="menu menu-horizontal px-1">
                <li>
                    <Link href='/orders'>Orders</Link>
                </li>
                <li>
                    <Link href='/cart'>Cart</Link>
                </li>
            </ul>
        </div>
  </div>
  )
}