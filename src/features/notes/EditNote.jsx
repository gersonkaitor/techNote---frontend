import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectNoteById } from './notesApiSlice'
import { selectAllUsers } from '../users/usersApiSlice'
import EditNoteForm from './EditNoteForm'
import Spinner from '../../components/Spinner'

const EditNote = () => {
  const { id } = useParams()

  const note = useSelector(state => selectNoteById(state, id))
  const users = useSelector(selectAllUsers)
  
  if(note && users) return <EditNoteForm note={note} users={users}/>
  else return <Spinner/>
}

export default EditNote