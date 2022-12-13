import { useGetUsersQuery } from "./usersApiSlice";
import User from './User'
import Spinner from "../../components/Spinner";
import {toast} from 'react-toastify'

const UsersList = () => {
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery();

  if(isLoading) return <Spinner/>

  if(isError){
  //  return  <p className={isError ? 'errmsg' : "offscreen"}>{error?.data?.message}</p>
  toast.error(error?.data?.message)
  }

  
  if (isSuccess) {

    const { ids } = users

    const tableContent = ids?.length
        ? ids.map(userId => <User key={userId} userId={userId} />)
        : null

    return  (
        <table className="table table--users">
            <thead className="table__thead">
                <tr>
                    <th scope="col" className="table__th user__username">Username</th>
                    <th scope="col" className="table__th user__roles">Roles</th>
                    <th scope="col" className="table__th user__edit">Edit</th>
                </tr>
            </thead>
            <tbody>
                {tableContent}
            </tbody>
        </table>
    )
}
};

export default UsersList;
