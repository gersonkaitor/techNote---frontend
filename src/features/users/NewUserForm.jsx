import { useState, useEffect } from "react";
import { useAddNewUserMutation } from "./usersApiSlice";
import { useNavigate } from "react-router-dom";
import { FaSave } from "react-icons/fa";
import { ROLES } from "../../config/roles";
import { toast } from "react-toastify";

const USER_REGEX = /^[A-z]{3,20}$/;
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/;

const NewUserForm = () => {
  const [addNewUser, { isLoading, isSuccess, isError, error }] =
    useAddNewUserMutation();

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [validUsername, setValidUsername] = useState(false);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [roles, setRoles] = useState(["Employee"]);

  useEffect(() => {
    setValidUsername(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
  }, [password]);

  useEffect(() => {
    console.log(isSuccess);
    if (isSuccess) {
      setUsername("");
      setPassword("");
      setRoles([]);
      navigate("/dash/users");
    }
  }, [isSuccess, navigate]);

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
    e.preventDefault();
    if (canSave) {
      await addNewUser({ username, password, roles });
    }
  };

  const canSave =
    [roles.length, validUsername, validPassword].every(Boolean) && !isLoading;

  if (isError) toast.error(error?.data?.message);

  return (
    <>
      <form className="form" onSubmit={onSaveUserClicked}>
        <div className="form__title-row">
          <h2>New User</h2>
          <div className="form__action-buttons">
            <button
              className="icon-button"
              title="Save"
              onClick={onSaveUserClicked}
               disabled={!canSave}
            >
              <FaSave />
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
          Password:<span className="nowrap">[4-12 chars incl. !@#$%]</span>
        </label>
        <input
          type="password"
          className={`form__input ${
            !validPassword ? "form__input--incomplete" : ""
          }`}
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

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

export default NewUserForm;
