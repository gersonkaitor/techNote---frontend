import { useSelector } from "react-redux";
import { selectAllUsers } from "../users/usersApiSlice";
import NewNoteForm from "./NewNoteForm";
import Spinner from "../../components/Spinner";

const NewNote = () => {
  const users = useSelector(selectAllUsers);
  if (users) {
    return <NewNoteForm users={users} />;
  } else return <Spinner />;
};

export default NewNote;
