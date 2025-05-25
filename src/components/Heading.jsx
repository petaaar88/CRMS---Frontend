import UserBadge from './UserBadge'

const Heading = ({title}) => {
  return (
    <div className='flex justify-between items-center mb-8 dark:bg-moja'>
      <h1 className='text-4xl font-bold text-black dark:text-warm-gray'>{title}</h1>
      <UserBadge/>
    </div>
  )
}

export default Heading
