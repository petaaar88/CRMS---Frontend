import UserBadge from './UserBadge'
import useBreakpoints from '../hooks/useBreakpoints'

const Heading = ({title}) => {
    const {isMdBreakpoint} = useBreakpoints();
    return (
        <div className='flex justify-between items-center mb-8 dark:bg-moja'>
            <h1 className='text-4xl font-bold text-black dark:text-warm-gray'>{title}</h1>
            {isMdBreakpoint ? <UserBadge/> : null}
        </div>
    )
}

export default Heading