import { useState, useEffect } from "react";
import { useUpdateUserMutation, useDeleteUserMutation } from "./usersApiSlice";
import { useNavigate } from "react-router-dom";
import { FaSave, FaTrashAlt } from "react-icons/fa";
import { ROLES } from "../../config/roles";
import { toast } from "react-toastify";

const USER_REGEX = /^[A-z]{3,20}$/;
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/;

const EditUserForm = ({ user }) => {
  const [updateUser, { isLoading, isSuccess, isError, error }] =
    useUpdateUserMutation();

  const [
    deleteUser,
    { isSuccess: isDelSuccess, isError: isDelError, error: delerror },
  ] = useDeleteUserMutation();

  const navigate = useNavigate();

  const [username, setUsername] = useState(user.username);
  const [validUsername, setValidUsername] = useState(false);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [roles, setRoles] = useState(user.roles);
  const [active, setActive] = useState(user.active);

  useEffect(() => {
    setValidUsername(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
  }, [password]);

  useEffect(() => {
    console.log(isSuccess);
    if (isSuccess || isDelSuccess) {
      setUsername("");
      setPassword("");
      setRoles([]);
      navigate("/dash/users");
    }
  }, [isSuccess, isDelSuccess, navigate]);

  const onRolesChanged = (e) => {
    const values = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setRoles(values);
  };

  const options = Object.values(ROLES).map((role) => {
    return (
      <option key={role} value={role}>
        {role}
      </option>
    );
  });

  const onSaveUserClicked = async (e) => {
    if(password){
      await updateUser({id: user.id, username, password, roles, active})
    }else{
      await updateUser({id: user.id, username, roles, active})
    }
  };

  const onDeleteUserClicked = async() => {
    await deleteUser({id: user.id})
  };

  let canSave;
  if (password) {
    canSave =
      [roles.length, validUsername, validPassword].every(Boolean) && !isLoading;
  } else {
    canSave = [roles.length, validUsername].every(Boolean) && !isLoading;
  }

  if(isError) toast.error(error?.data?.message)
  if(isDelError) toast.error(delerror?.data?.message)

  return (
    <>
      <form className="form" onSubmit={e => e.preventDefault()}>
        <div className="form__title-row">
          <h2>Edit User</h2>
          <div className="form__action-buttons">
            <button
              className="icon-button"
              title="Save"
              onClick={onSaveUserClicked}
              disabled={!canSave}
            >
              <FaSave />
            </button>
            <button
              className="icon-button"
              title="Delete"
              onClick={onDeleteUserClicked}
            >
              <FaTrashAlt />
            </button>
          </div>
        </div>

        <label htmlFor="username" className="form__label">
          Username : <span className="nowrap">[3-20 letters]</span>
        </label>
        <input
          type="text"
          className={`form__input ${
            !validUsername ? "form__input--incomplete" : ""
          }`}
          id="username"
          name="username"
          autoComplete="off"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="password" className="form__label">
          Password: <span className="nowrap">[empty = no change]</span>{" "}
          <span className="nowrap">[4-12 chars incl. !@#$%]</span>
        </label>
        <input
          type="password"
          className={`form__input ${
            password && !validPassword ? "form__input--incomplete" : ""
          }`}
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <label
          htmlFor="user-active"
          className="form__label form__checkbox-container"
        >
          ACTIVE:
          <input
            type="checkbox"
            className="form__checkbox"
            id="user-active"
            name="user-active"
            checked={active}
            onChange={() => setActive((prev) => !prev)}
          />
        </label>

        <label htmlFor="roles" className="form__label">
          ASSIGNED ROLES:
        </label>
        <select
          name="roles"
          id="roles"
          className={`form__select ${
            !Boolean(roles.length) ? "form__input--incomplete" : ""
          }`}
          multiple={true}
          size="3"
          value={roles}
          onChange={onRolesChanged}
        >
          {options}
        </select>
      </form>
    </>
  );
};

export default EditUserForm;
