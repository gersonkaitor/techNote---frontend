import { useState, useEffect } from "react";
import { useUpdateNoteMutation, useDeleteNoteMutation } from "./notesApiSlice";
import { useNavigate } from "react-router-dom";
import { FaSave, FaTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";

const EditNoteForm = ({ note, users }) => {
  const [updateNote, { isLoading, isSuccess, isError, error }] =
    useUpdateNoteMutation();

  const [
    deleteNote,
    { isSuccess: isDelSuccess, isError: isDelError, error: delerror },
  ] = useDeleteNoteMutation();

  const navigate = useNavigate();

  const [title, setTitle] = useState(note.title);
  const [text, setText] = useState(note.text);
  const [completed, setCompleted] = useState(note.completed);
  const [userId, setUserId] = useState(note.user);

  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      setTitle("");
      setText("");
      setUserId("");
      navigate("/dash/notes");
    }
  }, [isSuccess, isDelSuccess, navigate]);

  const canSave = [title, text, userId].every(Boolean) && !isLoading;

  const onSaveNoteClicked = async (e) => {
    if (canSave) {
      await updateNote({ id: note.id, user: userId, title, text, completed });
    }
  };

  const onDeleteNoteClicked = async (e) => {
    await deleteNote({ id: note.id });
  };

  const created = new Date(note.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })
  const updated = new Date(note.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })

  const options = users.map(user => {
    return (
        <option
            key={user.id}
            value={user.id}

        > {user.username}</option>
    )
})

  if (isError) toast.error(error?.data?.message);
  if (isDelError) toast.error(delerror?.data?.message);

  return (
    <>
      <form className="form" onSubmit={(e) => e.preventDefault()}>
        <div className="form__title-row">
          <h2>Edit Note # {note.ticket}</h2>
          <div className="form__action-buttons">
            <button
              className="icon-button"
              title="Save"
              onClick={onSaveNoteClicked}
              disabled={!canSave}
            >
              <FaSave />
            </button>
            <button
              className="icon-button"
              title="Delete"
              onClick={onDeleteNoteClicked}
            >
              <FaTrashAlt />
            </button>
          </div>
        </div>

        <label htmlFor="note-title" className="form__label">
          Title
        </label>
        <input
          type="text"
          className={`form__input ${!title ? "form__input--incomplete" : ""}`}
          id="title"
          name="title"
          autoComplete="off"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="note-text" className="form__label">
          Text:
        </label>
        <textarea
          name="text"
          id="note-text"
          className={`form__input form__input--text ${
            !text ? "form__input--incomplete" : ""
          }`}
          value={text}
          onChange={e=> setText(e.target.value)}
        />

        <div className="form__row">
          <div className="form__divider">
            <label
              htmlFor="note-completed"
              className="form__label form__checkbox-container"
            >
              WORK COMPLETED:
              <input
                type="checkbox"
                className="form__checkbox"
                id="note-completed"
                name="completed"
                checked={completed}
                onChange={(e) => setCompleted((prev) => !prev)}
              />
            </label>

            <label
              htmlFor="note-username"
              className="form__label form__checkbox-container"
            >
              ASSIGNED TO:
            </label>
            <select
              name="username"
              id="note-username"
              className="form__select"
              value={userId}
              onChange={e => setUserId(e.target.value)}
            >
              {options}
            </select>
          </div>

          <div className="form__divider">
            <p className="form__created">Created: <br />{created}</p>
            <p className="form__updated">Updated: <br />{updated}</p>
          </div>
        </div>
      </form>
    </>
  );
};

export default EditNoteForm;
