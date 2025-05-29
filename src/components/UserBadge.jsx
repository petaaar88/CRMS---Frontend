const UserBadge = () => {
  return (
    <div className='flex items-center gap-x-3 md:shadow-lg md:bg-light-gray dark:bg-dark-green px-5 py-3 rounded-lg'>
        <img src="https://static-00.iconduck.com/assets.00/a-letter-icon-2048x2048-ivt882vt.png" style={{width:"40px",height:"40px"}} alt="" />
        <div>
            <p className='text-black dark:text-white font-semibold '>Username</p>
            <p className='text-black dark:text-white font-light text-sm'>Role</p>    
        </div>
    </div>
  )
}


export default UserBadge