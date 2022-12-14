import { useGetNotesQuery } from './notesApiSlice'
import Note from './Note'
import Spinner from "../../components/Spinner";
import {toast} from 'react-toastify'

const NoteList = () => {

  const {
    data: notes,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetNotesQuery();

  if(isLoading) return <Spinner/>

  if(isError){
  //  return  <p className={isError ? 'errmsg' : "offscreen"}>{error?.data?.message}</p>
  toast.error(error?.data?.message)
  }

  if (isSuccess) {
    const { ids } = notes

    const tableContent = ids?.length
        ? ids.map(noteId => <Note key={noteId} noteId={noteId} />)
        : null

   return(
        <table className="table table--notes">
            <thead className="table__thead">
                <tr>
                    <th scope="col" className="table__th note__status">Username</th>
                    <th scope="col" className="table__th note__created">Created</th>
                    <th scope="col" className="table__th note__updated">Updated</th>
                    <th scope="col" className="table__th note__title">Title</th>
                    <th scope="col" className="table__th note__username">Owner</th>
                    <th scope="col" className="table__th note__edit">Edit</th>
                </tr>
            </thead>
            <tbody>
                {tableContent}
            </tbody>
        </table>
    )
}
}

export default NoteList
