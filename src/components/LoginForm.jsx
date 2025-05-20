import { TextField } from "@mui/material"

const LoginForm = () => {

  const handleSubmit = (e) =>{
    e.preventDefault();
  }

  return (
    <form method="POST" className="flex flex-col gap-y-3" onSubmit={handleSubmit}>
      <TextField className="lg:w-140 sm:w-100 w-83"  id="outlined-basic" label="Username" variant="outlined" />
      <TextField className="lg:w-140 sm:w-100 w-83"  id="outlined-basic" label="Password" variant="outlined" />
      <div className="flex justify-end mt-3">
        <button className="bg-amber-400 sm:w-auto w-full cursor-pointer px-10 py-2 rounded-xl text-lg font-medium">Login</button>
      </div>
    </form>
  )
}

export default LoginForm