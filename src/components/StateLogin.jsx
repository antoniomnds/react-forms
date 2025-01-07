import {useState} from 'react';
import {isEmail, hasMinLength} from "../util/validation.js";

export default function Login() {
  const [enteredValues, setEnteredValues] = useState({
    email: '',
    password: ''
  });

  const [didEdit, setDidEdit] = useState({
    email: false,
    password: false
  })

  const emailIsInvalid = didEdit.email && !isEmail(enteredValues.email);
  const passwordIsInvalid = didEdit.password && !hasMinLength(enteredValues.password, 8);

  function handleSubmit(event) {
    event.preventDefault(); // prevent from generating and sending an HTTP request
    console.log(enteredValues)
  }

  function handleInputChange(identifier, value) {
    setEnteredValues(prevValues => ({
      ...prevValues,
      [identifier]: value
    }));
    // to clear error on keystroke
    setDidEdit(prevEdit => ({
      ...prevEdit,
      [identifier]: false
    }))
  }

  function handleInputBlur(identifier) {
    setDidEdit(prevEdit => ({
      ...prevEdit,
      [identifier]: true
    }))
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            onBlur={() => handleInputBlur('email')}
            onChange={event => handleInputChange('email', event.target.value)}
            value={enteredValues.email}
          />
          <div className="control-error">
            { emailIsInvalid && <p>Please enter a valid email address.</p>}
          </div>
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            onBlur={() => handleInputBlur('password')}
            onChange={event => handleInputChange('password', event.target.value)}
            value={enteredValues.password}
          />
          <div className="control-error">
            {passwordIsInvalid && <p>Please enter at least 8 characters.</p>}
          </div>
        </div>
      </div>

      <p className="form-actions">
        <button type="reset" className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
