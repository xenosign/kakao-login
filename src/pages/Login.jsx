import React, { useRef } from 'react';
import { login } from '../store/modules/user';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Login() {
  const loginIdInput = useRef();
  const loginPwInput = useRef();
  const registerIdInput = useRef();
  const registerPwInput = useRef();

  const dispatch = useDispatch();

  // KAKAO 로그인 용
  // CLIENT_ID 로 REST API 키 사용 필요
  const KAKAO_CLIENT_ID = '2be90ab71a1f36d735f12cd91b53a982';
  const KAKAO_REDIRECT_URI = 'http://localhost:3000/oauth/callback/kakao';
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;

  const loginHandler = async () => {
    if (!loginIdInput.current.value || !loginPwInput.current.value)
      return alert('값을 입력 하세요');

    const resLogin = await fetch('http://localhost:4000/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: loginIdInput.current.value,
        password: loginPwInput.current.value,
      }),
    });

    if (resLogin.status === 200) {
      dispatch(
        login({
          id: loginIdInput.current.value,
          password: loginPwInput.current.value,
        }),
      );
      loginIdInput.current.value = '';
      loginPwInput.current.value = '';
      return alert(await resLogin.json());
    } else {
      return alert(await resLogin.json());
    }
  };

  const registerHandler = async () => {
    if (!registerIdInput.current.value || !registerPwInput.current.value)
      return alert('값을 입력 하세요');

    const resRegister = await fetch('http://localhost:4000/user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: registerIdInput.current.value,
        password: registerPwInput.current.value,
      }),
    });

    if (resRegister.status === 200) {
      dispatch(
        login({
          id: registerIdInput.current.value,
          password: registerPwInput.current.value,
        }),
      );
      registerIdInput.current.value = '';
      registerPwInput.current.value = '';
      return alert(await resRegister.json());
    } else {
      return alert(await resRegister.json());
    }
  };

  return (
    <>
      {/* 로그인 파트 */}
      <h1>로그인 파트 입니다</h1>
      아이디 <input type="text" ref={loginIdInput} required />
      <br />
      <br />
      비밀번호 <input type="password" ref={loginPwInput} required />
      <br />
      <br />
      <button onClick={loginHandler}>로그인</button>{' '}
      <Link to={KAKAO_AUTH_URL}>카카오 로그인</Link>
      <br />
      <br />
      {/* 회원가입 파트 */}
      <h1>회원가입 파트 입니다</h1>
      아이디 <input type="text" ref={registerIdInput} required />
      <br />
      <br />
      비밀번호 <input type="password" ref={registerPwInput} required />
      <br />
      <br />
      <button onClick={registerHandler}>회원 가입</button>{' '}
      <button>카카오 로그인</button>
    </>
  );
}
