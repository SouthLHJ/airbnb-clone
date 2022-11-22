import TextField, { TextFieldProps } from '@mui/material/TextField';
import { OutlinedInputProps } from '@mui/material/OutlinedInput';
import { alpha, styled } from '@mui/material/styles';

import Switch, { SwitchProps } from '@mui/material/Switch';
import Stack from '@mui/material/Stack';

import { CustomColor } from '../../../interfaces/setting/color';

export const TopTextField = styled((props: TextFieldProps) => (
    <TextField
      InputProps={{ disableUnderline: true } as Partial<OutlinedInputProps>}
      {...props}
    />
  ))(({ theme }) => ({
    
    '& .MuiFilledInput-root': {
      border: '1px solid ',
      overflow: 'hidden',
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      borderColor : theme.palette.mode === 'dark' ? "red" : CustomColor.blackHover ,
      backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
      transition: theme.transitions.create([
        'border-color',
        'background-color',
        'box-shadow',
      ]),
      '&:hover': {
        backgroundColor: 'transparent',
        borderColor : CustomColor.blackHover,
      },
      '&.Mui-focused': {
        backgroundColor: 'transparent',
        // boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
        borderColor: CustomColor.black,
        color : CustomColor.black,
        
      },
      '&.Mui-error' :{
        color : "red",
        borderColor : "red"
      }
      
    },
}));


export const MiddleTextField = styled((props: TextFieldProps) => (
  <TextField
    InputProps={{ disableUnderline: true } as Partial<OutlinedInputProps>}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiFilledInput-root': {
    border: '1px solid ',
    overflow: 'hidden',
    borderRadius: 0,
    borderColor : CustomColor.blackHover,
    backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
    transition: theme.transitions.create([
      'border-color',
      'background-color',
      'box-shadow',
    ]),
    '&:hover': {
      backgroundColor: 'transparent',
      borderColor : CustomColor.blackHover,
    },
    '&.Mui-focused': {
      backgroundColor: 'transparent',
      // boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
      borderColor: CustomColor.black,
      color : CustomColor.black,
        
    },
    '&.Mui-error' :{
      color : "red",
      borderColor : "red"
    }
  },
}));


export const BottomTextField = styled((props: TextFieldProps) => (
  <TextField
    InputProps={{ disableUnderline: true } as Partial<OutlinedInputProps>}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiFilledInput-root': {
    border: '1px solid ',
    overflow: 'hidden',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderColor : CustomColor.blackHover,
    backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
    transition: theme.transitions.create([
      'border-color',
      'background-color',
      'box-shadow',
    ]),
    '&:hover': {
      backgroundColor: 'transparent',
      borderColor : CustomColor.blackHover,
    },
    '&.Mui-focused': {
      backgroundColor: 'transparent',
      // boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
      borderColor: CustomColor.black,
      color : CustomColor.black,
        
    },
    '&.Mui-error' :{
      color : "red",
      borderColor : "red"
    }
  },
}));

export const DetailSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : CustomColor.main,
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color:
        theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));