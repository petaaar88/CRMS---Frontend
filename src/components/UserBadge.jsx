import React from 'react'

const UserBadge = () => {
  return (
    <div className='flex items-center gap-x-3 bg-stone-700 px-5 py-3 rounded-xl'>
        <img src="https://static-00.iconduck.com/assets.00/a-letter-icon-2048x2048-ivt882vt.png" style={{width:"40px",height:"40px"}} alt="" />
        <div>
            <p className='text-white font-semibold '>Username</p>
            <p className='text-white font-light text-sm'>Role</p>    
        </div>
    </div>
  )
}

export default UserBadge