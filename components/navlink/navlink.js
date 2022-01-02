import Link from 'next/link'
import { FC } from 'react'
import s from './navlink.module.css'

const NavLink = ({ href, children }) => {
  return (
    <Link href={href}>
      <a href={href} className={s.bgPrimary}>
        {children}
      </a>
    </Link>
  )
}

export default NavLink
