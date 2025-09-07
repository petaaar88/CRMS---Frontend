import { Visibility, VisibilityOff } from "@mui/icons-material";
import { FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material"
import { useContext, useState } from "react";
import { useAuth }  from '../contexts/AuthContext';
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../contexts/ThemeContext";

const LoginForm = () => {

  const COLORS = {
    white: '#FFFFFF',
    darkGray: '#5A5A5A',
    black: '#000000',
    gray: '#F6F6F6',
  
    darkGreen: '#252E2D',
    darkerGreen: '#181F20',
    forestGreen: '#244E39',
    lightWhite: '#FFFFFF',
    warmGray: '#BCB5B5',
    lightGray: '#BEBEBE',
    deepGreen: '#2D3736',
  };

  const {theme} = useContext(ThemeContext);

  const navigate  = useNavigate();
  const { handleLogin, isError } = useAuth();

  const [credentials, setCredentials] = useState({username:null, password: null});

  const [showPassword, setShowPassword] = useState(false);
  

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async(e) =>{
    e.preventDefault();

    const success = await handleLogin(credentials);

    if(success) {
      setCredentials({username: null, password: null})
      navigate('/reports', {replace:true});  
    }
  }

  const handleUsernameInput = (e) => setCredentials({...credentials, username: e.target.value});
  const handlePasswordInput = (e) => setCredentials({...credentials, password: e.target.value});
  

  return (
    <form method="POST" className="flex flex-col gap-y-3" onSubmit={handleSubmit}>
      <TextField
          error={isError}
          required
          onChange={handleUsernameInput}
          className="lg:w-140 sm:w-100 w-83 [:-webkit-autofill]:bg-yellow-200"
          id="outlined-basic"
          label="Username"
          variant="outlined"
          helperText={isError ? "Invalid Username Or Password" : ""}
          sx={{
            '& label': {
              color: theme === "light" ? COLORS.black : COLORS.white, 
            },
            '& label.Mui-focused': {
              color: theme === "light" ? COLORS.black : COLORS.white, 
            },
            '& .MuiOutlinedInput-root': {
              backgroundColor: theme === "light" ? COLORS.white : COLORS.darkerGreen, 
              color: theme === "light" ? COLORS.black : COLORS.white,
              '& input': {
                color: theme === "light" ? COLORS.black : COLORS.white, 
                '&:-webkit-autofill': {
                  WebkitBoxShadow: `0 0 0 1000px ${theme === "light" ? COLORS.white : COLORS.darkerGreen} inset`,
                  WebkitTextFillColor: theme === "light" ? COLORS.black : COLORS.white,
                },
              },
              '& fieldset': {
                borderColor: COLORS.darkGray, 
              },
              '&:hover fieldset': {
                borderColor: COLORS.lightGray,
              },
              '&.Mui-focused fieldset': {
                borderColor: COLORS.lightGray, 
              },
            },
            '& .MuiFormHelperText-root': {
              color: '#ff6b6b',
            },
          }}
        />

      <FormControl
  error={isError}
  required
  onChange={handlePasswordInput}
  className="lg:w-140 sm:w-100 w-83"
  variant="outlined"
>
<InputLabel
    htmlFor="outlined-adornment-password"
    sx={{
      color: theme === "light" ? COLORS.black : COLORS.white,
      '&.Mui-focused': {
        color: theme === "light" ? COLORS.black : COLORS.white,
      },
    }}
  >
    Password
  </InputLabel>

  <OutlinedInput
    id="outlined-adornment-password"
    type={showPassword ? 'text' : 'password'}
    label="Password"
    endAdornment={
      <InputAdornment position="end">
        <IconButton
          aria-label={showPassword ? 'hide the password' : 'display the password'}
          onClick={handleClickShowPassword}
          onMouseDown={handleMouseDownPassword}
          onMouseUp={handleMouseUpPassword}
          edge="end"
          sx={{
            color: theme === "light" ? COLORS.black : COLORS.white,
          }}
        >
          {showPassword ? <VisibilityOff /> : <Visibility />}
        </IconButton>
      </InputAdornment>
    }
    sx={{
      backgroundColor: theme === "light" ? COLORS.white : COLORS.darkerGreen,
      color: theme === "light" ? COLORS.black : COLORS.white,
      '& input': {
        color: theme === "light" ? COLORS.black : COLORS.white,
        caretColor: theme === "light" ? COLORS.black : COLORS.white,
      },
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: COLORS.darkGray,
      },
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: COLORS.lightGray,
      },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: COLORS.lightGray,
      },
    }}
  />
  <FormHelperText sx={{ color: '#ff6b6b' }}>
    {isError ? 'Invalid Username Or Password' : ''}
  </FormHelperText>
</FormControl>

      <div className="flex justify-end mt-3">
        <button className="bg-button-light-green hover:bg-menu-button-light active:bg-green-700 dark:bg-button-dark-green dark:hover:bg-deep-green active:dark:bg-darker-green text-white sm:w-45 w-full cursor-pointer px-10 py-2 rounded-[7px] text-lg font-medium">Login</button>
      </div>
    </form>
  )
}

export default LoginForm