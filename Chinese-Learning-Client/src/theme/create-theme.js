import { CssBaseline, createTheme, ThemeProvider } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ffeb3b',
      light: '#fff9c4',
      dark: '#f57f17',
      contrastText: '#000',
    },
  },
  typography: {
    h1: {
      fontWeight: 700,
      fontSize: '2rem',
      lineHeight: '2.25rem',
    },
    h2: {
      fontWeight: 600,
      fontSize: '1.85rem',
      lineHeight: '2rem',
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.75rem',
      lineHeight: '2rem',
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: '1.75rem',
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: '1.75rem',
    },
    h6: {
      fontWeight: 600,
      fontSize: '1.125rem',
      lineHeight: '1.75rem',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: '1.25rem',
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: '1rem',
    },
    caption: {
      fontSize: '0.875rem',
      fontStyle: 'italic',
      lineHeight: '1.25rem',
    },
    subtitle1: {
      fontSize: '0.875rem',
      lineHeight: '1.25rem',
    },
    button: {
      fontWeight: 600,
      fontSize: '0.875rem',
      lineHeight: '1.25rem',
    },
  },
});
const CreateTheme = ({ children }) => {
  return (
    // ThemeModeProvider -> ThemeSchemaProvider
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      {children}
    </ThemeProvider>
  );
};
export default CreateTheme;
