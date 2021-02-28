import { Theme } from '../../defaultTheme'

export function getThemeProp(
  themeProp: keyof Theme['colors'],
  defaultValue: string,
  theme?: Theme,
) {
  if (
    theme &&
    typeof theme === 'object' &&
    theme.colors &&
    typeof theme.colors === 'object' &&
    theme.colors[themeProp]
  ) {
    return theme.colors[themeProp]
  }

  return defaultValue
}
