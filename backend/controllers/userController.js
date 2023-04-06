const connection = require('./dbConnect');

const registerUser = (req, res) => {
  try {
    connection.query(
      `SELECT * FROM mydb.user WHERE USERID = '${req.body.id}';`,
      (err, data) => {
        if (err) throw err;
        if (data.length >= 1)
          return res.status(400).json('이미 가입된 회원입니다');
        connection.query(
          `INSERT INTO mydb.user (USERID, PASSWORD) values ('${req.body.id}', '${req.body.password}');`,
          (err, data) => {
            if (err) throw err;
            res.status(200).json('회원가입 성공');
          },
        );
      },
    );
  } catch (err) {
    console.error(err);
    res.status(500).json('회원가입 실패, 알 수 없는 문제 발생');
  }
};

const loginUser = (req, res) => {
  try {
    connection.query(
      `SELECT * FROM mydb.user WHERE USERID = '${req.body.id}';`,
      (err, data) => {
        if (err) throw err;
        if (data.length === 0)
          return res.status(400).json('가입되지 않은 회원입니다.');
        if (data[0].PASSWORD !== req.body.password)
          return res.status(400).json('비밀번호가 다릅니다.');

        res.status(200).json('로그인 완료');
      },
    );
  } catch (err) {
    console.error(err);
    res.status(500).json('회원가입 실패, 알 수 없는 문제 발생');
  }
};

const kakaoLoginUser = (req, res) => {
  try {
    connection.query(
      `SELECT * FROM mydb.user WHERE USERID = '${req.body.id}';`,
      (err, data) => {
        if (err) throw err;
        if (data.length === 0)
          return res.status(400).json('가입되지 않은 회원입니다.');

        res.status(200).json('카카오 로그인 완료');
      },
    );
  } catch (err) {
    console.error(err);
    res.status(500).json('회원가입 실패, 알 수 없는 문제 발생');
  }
};

module.exports = {
  registerUser,
  loginUser,
  kakaoLoginUser,
};
