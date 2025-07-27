export const COLOR_THEME = {
  // Using purple as base color
  primary: {
    50: 'bg-purple-50',
    100: 'bg-purple-100',
    200: 'bg-purple-200',
    300: 'bg-purple-300',
    400: 'bg-purple-400',
    500: 'bg-purple-500',
    600: 'bg-purple-600',
    700: 'bg-purple-700',
    800: 'bg-purple-800',
    900: 'bg-purple-900',
    text: 'text-purple-600',
    border: 'border-purple-400',
    hover: 'hover:bg-purple-700'
  },
  // Status variants using purple shades
  status: {
    completed: 'bg-purple-100 text-purple-800 border-purple-200',
    pending: 'bg-purple-200 text-purple-800 border-purple-300',
    in_progress: 'bg-purple-300 text-purple-800 border-purple-400'
  },
  // Chart using purple gradient
  chart: {
    colors: ['#f3e8ff', '#c084fc', '#9333ea'] // purple-100, purple-400, purple-600
  }
} as const;