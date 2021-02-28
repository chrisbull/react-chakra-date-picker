import { useContext, useMemo } from 'react';
import merge from 'ts-deepmerge';
import { ThemeContext } from '../../context/ThemeContext';
import { Theme } from '../../defaultTheme';

export function useThemeProps<T extends Partial<Theme>>(themeProps: T): Theme {
  const context = useContext(ThemeContext);
  const theme = useMemo(() => {
    return merge(themeProps, context);
  }, [context, themeProps]);

  return theme;
}
