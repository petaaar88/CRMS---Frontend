import { Visibility, VisibilityOff } from "@mui/icons-material";
import { FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material"
import { useState } from "react";
import { useAuth }  from '../contexts/AuthContext';
import { useNavigate } from "react-router-dom";

const LoginForm = () => {

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
      <TextField error={isError} required onChange={handleUsernameInput} className="lg:w-140 sm:w-100 w-83"  id="outlined-basic" label="Username" variant="outlined" helperText={isError ? "Invalid Username Or Password" : ""} />
      <FormControl error={isError} required onChange={handlePasswordInput} className="lg:w-140 sm:w-100 w-83" variant="outlined" >
       <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput

            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end" >
                <IconButton
                  aria-label={
                    showPassword ? 'hide the password' : 'display the password'
                  }
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
            
          />
      <FormHelperText>
        {isError ? "Invalid Username Or Password" : ""}
      </FormHelperText>
      </FormControl>
      <div className="flex justify-end mt-3">
        <button className="bg-green-900 text-white sm:w-auto w-full cursor-pointer px-10 py-2 rounded-xl text-lg font-medium">Login</button>
      </div>
    </form>
  )
}

export default LoginForm