import ActivitiesForToday from '../../components/ActivitiesForToday'
import Heading from '../../components/Heading'
import UserDetails from '../../components/UserDetails'

const HomePage = () => {
  return (
    <div>
        <Heading title={"Home"} />
        <UserDetails/>
        <ActivitiesForToday/>
    </div>
  )
}

export default HomePage