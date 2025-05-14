const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require('openai');

const app = express();
const PORT = 8081;
const SERVER_IP = '192.168.56.1';

require('dotenv').config();
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// 미들웨어 설정
app.use(cors());
app.use(bodyParser.json());

// OpenAI 설정
const openai = new OpenAIApi(
  new Configuration({
    apiKey: OPENAI_API_KEY,
  })
);

// 🔹 [GET] 유저 정보 조회 (더미 데이터 반환)
app.get('/user-info/:userId', (req, res) => {
  const { userId } = req.params;

  // 🧪 실제 DB 없이 하드코딩된 유저 정보
  const dummyUsers = {
    user123: { nickname: '테스트유저', job: '농부' },
    user456: { nickname: '홍길동', job: '근로자' },
  };

  const user = dummyUsers[userId];

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: '유저 정보를 찾을 수 없습니다.' });
  }
});

// 🔹 [POST] 번역 요청 (OpenAI API 사용)
app.post('/translate', async (req, res) => {
  const { message } = req.body;

  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'Please translate the following to English.' },
        { role: 'user', content: message },
      ],
    });

    const translated = completion.data.choices[0].message.content;
    res.json({ translated });
  } catch (err) {
    console.error('OpenAI 번역 오류:', err);
    res.status(500).json({ error: '번역 실패' });
  }
});

// 서버 실행
app.listen(PORT, () => {
  console.log(`🚀 Node.js 서버 실행 중: http://${SERVER_IP}:${PORT}`);
});
