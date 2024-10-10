'use client';
import { createTheme } from '@mui/material/styles';
import { colors } from './color';
const baseColors = colors("mui")
console.log('baseColors: ', baseColors);
export const theme = createTheme({
    cssVariables: true,
    palette: {
        ...baseColors
    },
    components: {
        MuiTextField: {
          styleOverrides: {
            root: {
              '& .MuiInputBase-root': {
                color: '#333', // Text color
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: baseColors.primary.main, // Primary main color for outline
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: baseColors.primary.main, // Primary dark on hover
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: baseColors.primary.main, // Outline color when focused
                },
              },
              '& .MuiFormLabel-root': {
                color: '#333', // Label color
                '&.Mui-focused': {
                  color: baseColors.primary.main, // Label color when focused
                },
              },
            },
          },
        },
      },
});
