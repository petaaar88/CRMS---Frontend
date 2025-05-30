const UserBadge = () => {
  return (
    <div className='flex items-center gap-x-4 md:shadow-lg md:bg-light-gray dark:bg-deep-green px-5 py-3 rounded-lg'>
        <img src="https://api.dicebear.com/9.x/initials/svg?radius=50&seed=User" style={{width:"40px",height:"40px"}} alt="" />
        <div>
            <p className='text-black dark:text-white font-semibold '>Username</p>
            <p className='text-black dark:text-white font-light text-sm'>Role</p>    
        </div>
    </div>
  )
}


export default UserBadge