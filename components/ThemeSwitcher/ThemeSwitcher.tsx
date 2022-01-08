import React from 'react'
import { Sun as BiSun, Moon as BiMoon } from 'react-bootstrap-icons'
import { useState } from 'react'

export type ThemeType = 'light' | 'dark'

const ThemeSwitcher = () => {
  const [theme, setTheme] = useState<ThemeType>('light')

  return (
    <button>
      <BiSun />
    </button>
  )
}

export default ThemeSwitcher
