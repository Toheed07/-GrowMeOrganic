import { useAuth } from "../../context/authContext";
import DataTable from "../../components//dataTable/dataTable"
import DepartmentList from "../../components/list/list"

const Home = () => {
  const { currentUser } = useAuth() ?? {};

  return (
    <>
      {currentUser ?
        <>
          <div>
            <h1>Welcome {currentUser.name}</h1>
            <DataTable />
            <DepartmentList/>
          </div>
        </> :
        <h2>Log in to continue</h2>}
    </>
  )
}

export default Home