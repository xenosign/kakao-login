import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../store/modules/user';

const KakaoRedirectHandler = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const CODE = new URL(window.location.href).searchParams.get('code');
    const GRANT_TYPE = 'authorization_code';
    // REST API 키를 입력 해야 합니다!
    const KAKAO_CLIENT_ID = '2be90ab71a1f36d735f12cd91b53a982';
    const KAKAO_REDIRECT_URI = 'http://localhost:3000/oauth/callback/kakao';

    console.log(CODE);

    async function loginFetch() {
      const tokenResponse = await fetch(
        `https://kauth.kakao.com/oauth/token?grant_type=${GRANT_TYPE}&client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&code=${CODE}`,
        {
          method: 'POST',
          headers: {
            'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
          },
        },
      );

      if (tokenResponse.status === 200) {
        const tokenData = await tokenResponse.json();

        console.log(tokenData);

        const userResponese = await fetch(`https://kapi.kakao.com/v2/user/me`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${tokenData.access_token}`,
            'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
          },
        });

        if (userResponese.status === 200) {
          const userKaKaoInfo = await userResponese.json();

          console.log(userKaKaoInfo);

          const userLoginInfo = {
            id: userKaKaoInfo.kakao_account.email,
            password: 'kakao-user',
          };

          const resKakaoLogin = await fetch(
            'http://localhost:4000/user/kakaologin',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                id: userKaKaoInfo.kakao_account.email,
              }),
            },
          );

          if (resKakaoLogin.status == 200) {
            dispatch(login(userLoginInfo));
            return navigate('/');
          }

          const resRegister = await fetch(
            'http://localhost:4000/user/register',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                id: userKaKaoInfo.kakao_account.email,
                password: 'kakao-user',
              }),
            },
          );

          if (resRegister.status === 200) {
            dispatch(login(userLoginInfo));
            return navigate('/');
          } else {
            alert(await resRegister.json());
            return navigate('/');
          }
        } else {
          alert('카카오 로그인 회원 정보 획득 실패');
          return navigate('/');
        }
      } else {
        alert('카카오 로그인 토큰 발행 실패');
        return navigate('/');
      }
    }
    loginFetch();
  }, []);
};

export default KakaoRedirectHandler;
