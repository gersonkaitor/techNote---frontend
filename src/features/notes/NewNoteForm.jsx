import { useState, useEffect } from "react";
import { useAddNewNoteMutation } from "./notesApiSlice"
import { useNavigate } from "react-router-dom";
import { FaSave, FaTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";

const NewNoteForm = ({ note, users }) => {
  const [addNewNote, { isLoading, isSuccess, isError, error }] =
    useAddNewNoteMutation();

  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [userId, setUserId] = useState(users[0].id)

  useEffect(() => {
    if (isSuccess) {
      setTitle("");
      setText("");
      setUserId("");
      navigate("/dash/notes");
    }
  }, [isSuccess, navigate]);

  const canSave = [title, text, userId].every(Boolean) && !isLoading;

  const onSaveNoteClicked = async (e) => {
    if (canSave) {
      await addNewNote({ user: userId, title, text });
    }
  };

  const options = users.map(user => {
    return (
        <option
            key={user.id}
            value={user.id}

        > {user.username}</option>
    )
})

  if (isError) toast.error(error?.data?.message);

  return (
    <>
      <form className="form" onSubmit={onSaveNoteClicked}>
        <div className="form__title-row">
          <h2>New Note</h2>
          <div className="form__action-buttons">
            <button
              className="icon-button"
              title="Save"
              onClick={onSaveNoteClicked}
              disabled={!canSave}
            >
              <FaSave />
            </button>
          </div>
        </div>

        <label htmlFor="title" className="form__label">
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

        <label htmlFor="text" className="form__label">
          Text:
        </label>
        <textarea
          name="text"
          id="text"
          className={`form__input form__input--text ${
            !text ? "form__input--incomplete" : ""
          }`}
          value={text}
          onChange={e=> setText(e.target.value)}
        />


            <label
              htmlFor="username"
              className="form__label form__checkbox-container"
            >
              ASSIGNED TO:
            </label>
            <select
              name="username"
              id="username"
              className="form__select"
              value={userId}
              onChange={e => setUserId(e.target.value)}
            >
              {options}
            </select>
        
      </form>
    </>
  );
};

export default NewNoteForm;
