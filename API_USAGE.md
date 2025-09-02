# API 사용법 가이드

## 개요
이 프로젝트는 백엔드 API와 연동하여 사용자 인증 및 데이터 관리를 수행합니다.

## 백엔드 API 주소
```
https://84e87d01-5c0b-4a05-a00d-c4f82bfa8a31.mock.pstmn.io
```

## 설정 파일

### 1. API 설정 (`src/config/api.js`)
- 백엔드 기본 URL 설정
- API 엔드포인트 정의
- 요청 기본 설정 (헤더, 타임아웃 등)

### 2. API 서비스 (`src/services/api.js`)
- HTTP 메서드 (GET, POST, PUT, DELETE, PATCH)
- 인증 관련 API 함수
- 사용자 관련 API 함수
- 에러 처리 및 응답 파싱

## 사용법

### 기본 API 호출
```javascript
import { api } from '../services/api.js';

// GET 요청
const data = await api.get('/api/users');

// POST 요청
const result = await api.post('/api/register', userData);

// PUT 요청
const updated = await api.put('/api/users/1', updateData);

// DELETE 요청
await api.delete('/api/users/1');
```

### 인증 API 사용
```javascript
import { authAPI } from '../services/api.js';

// 일반 로그인
const loginResult = await authAPI.login({
  login_id: 'user123',
  password: 'password123'
});

// 카카오 로그인
const kakaoResult = await authAPI.kakaoLogin(authCode);

// 카카오 사용자 완성 (닉네임 설정)
const completeResult = await authAPI.kakaoComplete('닉네임');

// 회원가입
const signupResult = await authAPI.signup(userData);

// 로그아웃
await authAPI.logout();
```

### 사용자 API 사용
```javascript
import { userAPI } from '../services/api.js';

// 사용자 프로필 조회
const profile = await userAPI.getProfile();

// 사용자 프로필 업데이트
const updated = await userAPI.updateProfile(updateData);
```

## 에러 처리
API 서비스는 자동으로 에러를 처리하며, 실패한 요청은 예외를 발생시킵니다.

```javascript
try {
  const result = await api.post('/api/endpoint', data);
  // 성공 처리
} catch (error) {
  console.error('API 오류:', error);
  // 에러 처리
}
```

## 환경별 설정
현재는 개발 환경용 Mock API를 사용하고 있습니다. 프로덕션 환경에서는 환경 변수를 통해 API 주소를 변경할 수 있습니다.

## 주의사항
1. 모든 API 요청은 비동기로 처리됩니다.
2. 에러 발생 시 적절한 사용자 피드백을 제공해야 합니다.
3. 민감한 데이터는 HTTPS를 통해 전송됩니다.
4. API 응답 형식에 맞춰 데이터를 처리해야 합니다.
