export const defaultTheme = {
  colors: {
    primaryColor: 'blue.500',
    accessibility: 'blue.500',
    selectedDay: 'blue.200',
    selectedDayHover: 'blue.300',
    charcoal: 'gray.900',
    mud: 'gray.500',
    darcula: 'gray.700',
    greey: 'gray.400',
    silverCloud: 'gray.300',
    graci: 'gray.200',
    normalDayHover: 'gray.200',
    white: 'white',
  },
  daySize: ['32px', '48px'],
  dayFontWeight: 'md',
  dayFontSize: [12, 16],
};

export type Theme = typeof defaultTheme;
