import { useContext } from 'react'
import { ThemeContext } from '../../context/ThemeContext'

export const useThemeProps = () => useContext(ThemeContext)
