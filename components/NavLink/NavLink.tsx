import Link from 'next/link'
import React from 'react'
import s from './NavLink.module.css'

interface NavLinkProps {
  href: string
  children: React.ReactNode
}

const NavLink = ({ href, children }: NavLinkProps) => {
  return (
    <Link href={href}>
      <a href={href} className={s.bgPrimary}>
        {children}
      </a>
    </Link>
  )
}

export default NavLink
