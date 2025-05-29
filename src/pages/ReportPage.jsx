import { NavLink } from "react-router-dom"
import Heading from "../components/Heading"
import TableRow from "../components/TableRow"

const ReportPage = () => {
  return (
    <div>
        <Heading title={"Partners & Reports"} />
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio perspiciatis hic exercitationem nihil voluptatibus? Animi porro quo laboriosam magni inventore, sequi at fugit, atque earum quisquam officia ab, iusto iure?</p>
        <NavLink to={"/login"} >Login</NavLink>
        <TableRow data={{"Ime": "Marko", "Prezime": "Markovic", "Grad": "Novi Sad"}}/>
    </div>
  )
}

export default ReportPage
