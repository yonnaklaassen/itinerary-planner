import { createTheme, responsiveFontSizes } from '@mui/material/styles';

let muiTheme = createTheme({
  typography: {
    h1: {
      fontSize: 'var(--font-size-xxlarge)',
      lineHeight: 1.2,
    },
    h2: {
      fontSize: 'var(--font-size-xlarge)',
      lineHeight: 1.2,
    },
    h3: {
      fontSize: 'var(--font-size-large)',
      lineHeight: 1.2,
    },
    h4: {
      fontSize: 'var(--font-size-medium)',
      lineHeight: 1.2,
    },
    h5: {
      fontSize: 'var(--font-size-small)',
      lineHeight: 1.2,
    },
    h6: {
      fontSize: 'var(--font-size-small)',
      lineHeight: 1.2,
    },
    body1: {
      fontSize: 'var(--font-size-medium)',
      lineHeight: 1.5,
    },
    body2: {
      fontSize: 'var(--font-size-small)',
      lineHeight: 1.5,
    },
    button: {
      fontSize: 'var(--font-size-medium)',
      lineHeight: 1.5,
      textTransform: 'none',
    },
    caption: {
      fontSize: 'var(--font-size-small)',
      lineHeight: 1.5,
    },
  },

  components: {
    MuiContainer: {
      defaultProps: {
        maxWidth: 'xs',
      },
      styleOverrides: {
        root: {
          paddingLeft: '1rem',
          paddingRight: '1rem',
        },
      },
    },
    MuiGrid: {
      defaultProps: {
        spacing: 2,
      },
    },
  MuiTypography: {
    variants: [
      { props: { variant: 'h1' }, style: { margin: '0 0 1rem 0', textShadow: '0.05em 0.05em 0.1em rgba(0,0,0,0.25)' } },
      { props: { variant: 'h2' }, style: { margin: '0 0 1rem 0', textShadow: '0.05em 0.05em 0.1em rgba(0,0,0,0.25)' } },
      { props: { variant: 'h3' }, style: { margin: '0 0 1rem 0', textShadow: '0.05em 0.05em 0.1em rgba(0,0,0,0.25)' } },
      { props: { variant: 'h4' }, style: { margin: '0 0 0.75rem 0', textShadow: '0.05em 0.05em 0.1em rgba(0,0,0,0.25)' } },
      { props: { variant: 'h5' }, style: { margin: '0 0 0.75rem 0', textShadow: '0.05em 0.05em 0.1em rgba(0,0,0,0.25)' } },
      { props: { variant: 'h6' }, style: { margin: '0 0 0.75rem 0', textShadow: '0.05em 0.05em 0.1em rgba(0,0,0,0.25)' } },
      { props: { variant: 'body1' }, style: { margin: '0 0 1rem 0', textShadow: '0.05em 0.025em 0.05em rgba(0,0,0,0.25)' } },
      { props: { variant: 'body2' }, style: { margin: '0 0 1rem 0', textShadow: '0.05em 0.025em 0.05em rgba(0,0,0,0.25)' } },
      { props: { variant: 'caption' }, style: { margin: '0 0 1rem 0', textShadow: '0.05em 0.025em 0.05em rgba(0,0,0,0.25)' } },
    ],
  },
  MuiButton: {
    styleOverrides: {
      root: {
        backgroundColor: 'var(--color-primary)',
        boxShadow: '0.1em 0.1em 0.3em rgba(0,0,0,0.2)',
        margin: '1rem',
        '&:hover': {
          boxShadow: '0.15em 0.15em 0.4em rgba(0,0,0,0.5)',
        },
      },
    },
  },
  MuiTextField: {
    defaultProps: {
      fullWidth: true,
      margin: 'normal',
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        fontFamily: 'var(--font-family-base)',
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: 'var(--color-primary)',
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: 'var(--color-primary)',
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: 'var(--color-primary)',
        },
        '& input': {
          boxShadow: '0.15em 0.15em 0.4em rgba(0,0,0,0.25)',
        }
      },
    },
  },
  MuiInputLabel: {
    styleOverrides: {
      root: {
        fontFamily: 'var(--font-family-base)',
        color: 'var(--color-text-muted)',
        '&.Mui-focused': {
          color: 'var(--color-accent)',
        },
        '& input': {
          boxShadow: '0.15em 0.15em 0.4em rgba(0,0,0,0.25)',
        }
      },
    },
  },
},
});

muiTheme = responsiveFontSizes(muiTheme);

export default muiTheme;
