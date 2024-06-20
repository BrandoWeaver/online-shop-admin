import { createTheme, PaletteColorOptions } from '@mui/material/styles';

const primary: PaletteColorOptions = {
  main: '#016DEE',
  light: '#e4f0ff',
  dark: '#0157be',
};

// Create a theme instance.
const theme = createTheme({
  // typography: {
  //   fontFamily: 'Niradei',
  // },
  // spacing: 12,
  palette: {
    primary,
    secondary: {
      main: '#22224B',
    },
    info: {
      main: '#E0FF00',
    },
    warning: {
      main: '#FF6C0E',
    },
    success: {
      main: '#30B200',
      light: '#C0DF88',
    },
    error: {
      main: '#F5333F',
      light: '#FDE4E4',
    },
    background: {
      default: '#fff',
      paper: '#f5f5f5',
    },
    text: { primary: '#000000DE', secondary: '#616161' },
    // text: {
    //   primary: primary.main,
    //   secondary: '#4D4E4E',
    // },
    action: {
      active: '#C9C9C8',
      selected: '#C9C9C8',
    },
    grey: { 50: '#eff0f5', 300: '#E3E3E2', 400: '#AFAFAF' },
    // divider: primary.main,
  },
  shape: { borderRadius: 6 },
});

theme.shadows[2] = 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px';
theme.shadows[3] = '0px 4px 4px 0px #00000040';

theme.components = {
  MuiCssBaseline: {
    styleOverrides: ``,
  },
  // MuiAvatar: {
  //   styleOverrides: {
  //     root: {
  //       background: theme.palette.divider,
  //     },
  //   },
  // },
  MuiPaper: {
    styleOverrides: {
      rounded: {
        borderRadius: theme.spacing(2),
      },
    },
  },
  MuiMenu: {
    styleOverrides: {
      paper: {
        borderRadius: theme.spacing(0.5),
        backgroundColor: theme.palette.background.default,
      },
    },
  },
  MuiAppBar: {
    styleOverrides: {
      colorDefault: {
        backgroundColor: theme.palette.background.default,
      },
    },
  },
  MuiChip: {
    styleOverrides: {
      filled: {
        color: theme.palette.text.secondary,
        backgroundColor: theme.palette.grey[50],
      },
      filledPrimary: {
        color: theme.palette.common.white,
        backgroundColor: theme.palette.primary.main,
      },
    },
  },
  MuiButtonBase: {
    defaultProps: {
      disableRipple: true,
    },
  },
  MuiButton: {
    defaultProps: {
      disableElevation: true,
    },
    styleOverrides: {
      root: {
        textTransform: 'none',
        fontWeight: 700,
      },
      contained: {
        ':disabled': {
          background: theme.palette.action.active,
        },
      },
    },
  },
};

theme.typography.body1 = {
  fontSize: '0.875rem',
  [theme.breakpoints.up('md')]: {
    fontSize: '1rem',
  },
};

theme.typography.body2 = {
  fontSize: '0.75rem',
  [theme.breakpoints.up('md')]: {
    fontSize: '0.875rem',
  },
};

theme.typography.caption = {
  fontSize: '0.625rem',
  [theme.breakpoints.up('md')]: {
    fontSize: '0.75rem',
  },
};

export default theme;
