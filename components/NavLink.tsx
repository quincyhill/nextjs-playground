import Link from 'next/link'
import React from 'react'

interface NavLinkProps {
  href: string
  children: React.ReactNode
}

const NavLink = ({ href, children }: NavLinkProps) => {
  return (
    <Link href={href}>
      <a href={href} className="bg-blue-300">
        {children}
      </a>
    </Link>
  )
}

export default NavLink
