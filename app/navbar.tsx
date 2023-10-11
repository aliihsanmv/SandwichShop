import Link from 'next/link'
import React from 'react'
import { cartRepo } from './helpers/cart-repository'

export default async function Navbar () {

  const cart = await cartRepo.getById(1);

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
                    <Link href='/cart' className='className="btn btn-ghost btn-circle"'>
                        <div className="indicator">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                            <span className="badge badge-sm indicator-item">{cart?.cartItems.length}</span>
                        </div>
                    </Link>
                </li>
            </ul>
        </div>
  </div>
  )
}