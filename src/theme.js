import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FF9900', // Naranja (similar a Amazon)
      light: '#FFB84D',
      dark: '#E68900',
      contrastText: '#fff',
    },
    secondary: {
      main: '#1a1a1a', // Negro oscuro
      light: '#333333',
      dark: '#000000',
      contrastText: '#fff',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
    text: {
      primary: '#1a1a1a',
      secondary: '#555555',
    },
    error: {
      main: '#d32f2f',
    },
    success: {
      main: '#388e3c',
    },
    warning: {
      main: '#f57c00',
    },
    info: {
      main: '#1976d2',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      color: '#1a1a1a',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      color: '#1a1a1a',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      color: '#1a1a1a',
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      color: '#1a1a1a',
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
      color: '#1a1a1a',
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
      color: '#1a1a1a',
    },
  },
  overrides: {
    MuiButton: {
      contained: {
        boxShadow: '0 2px 4px rgba(255, 153, 0, 0.3)',
        '&:hover': {
          boxShadow: '0 4px 8px rgba(255, 153, 0, 0.4)',
        },
      },
      root: {
        textTransform: 'none',
        fontWeight: 600,
        fontSize: '1rem',
      },
    },
    MuiAppBar: {
      root: {
        backgroundColor: '#1a1a1a',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
      },
    },
    MuiTextField: {
      root: {
        '& label.Mui-focused': {
          color: '#FF9900',
        },
        '& .MuiInput-underline:after': {
          borderBottomColor: '#FF9900',
        },
        '& .MuiOutlinedInput-root': {
          '&.Mui-focused fieldset': {
            borderColor: '#FF9900',
          },
        },
      },
    },
    MuiTable: {
      root: {
        backgroundColor: '#ffffff',
        '& thead': {
          backgroundColor: '#1a1a1a',
          '& th': {
            color: '#ffffff',
            fontWeight: 700,
          },
        },
        '& tbody tr:hover': {
          backgroundColor: '#f9f9f9',
        },
      },
    },
    MuiCard: {
      root: {
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
        '&:hover': {
          boxShadow: '0 3px 6px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.12)',
        },
      },
    },
  },
});

export default theme;
