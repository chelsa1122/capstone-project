import { createTheme } from '@mui/material/styles';
import { ThemeOptions } from '@mui/material/styles/createTheme';

export interface ThemeConfigInterface extends ThemeOptions{
    palette:{
    [key: string]: any;
    text: any;
   }
}

export const baseTheme: ThemeConfigInterface = createTheme({
    components:{
        MuiButton:{
            styleOverrides:{
                root:{
                    backgroundColor:'#3F51B5'
                }
            }
        }
    },
    typography:{
        fontFamily: 'Oswald, Arial, sans-serif',
    }
})