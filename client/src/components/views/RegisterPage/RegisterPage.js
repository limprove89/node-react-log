import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../_actions/user_action';

function RegisterPage(props) {
  const dispatch = useDispatch();

  const [inputs, setInputs] = useState({
    email: '',
    name: '',
    password: '',
    confirmPassword: '',
  });

  const { email, name, password, confirmPassword } = inputs;

  const onChange = e => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const onSubmitHandler = e => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return alert(`비밀번호가 다릅니다!`);
    }

    let body = {
      email,
      name,
      password,
    };

    dispatch(registerUser(body)).then(response => {
      if (response.payload.success) {
        props.history.push('/login');
      } else {
        alert('Failed to sign up');
      }
    });
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100vh',
      }}
    >
      <form
        style={{ display: 'flex', flexDirection: 'column' }}
        onSubmit={onSubmitHandler}
      >
        <label>Email</label>
        <input name="email" type="email" value={email} onChange={onChange} />
        <label>name</label>
        <input name="name" type="text" value={name} onChange={onChange} />
        <label>Password</label>
        <input
          name="password"
          type="password"
          value={password}
          onChange={onChange}
        />
        <label>Confirm Password</label>
        <input
          name="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={onChange}
        />
        <br />
        <button type="submit">Join</button>
      </form>
    </div>
  );
}

export default RegisterPage;
