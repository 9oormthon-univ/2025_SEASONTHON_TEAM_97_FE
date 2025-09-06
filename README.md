<a href="https://club-project-one.vercel.app/" target="_blank">
<img src="https://github.com/user-attachments/assets/daa622b9-7c69-4786-8db3-4996b7f140be" alt="배너" width="100%"/>
</a>

<br/>
<br/>

# 1. Project Overview (프로젝트 개요)
- 프로젝트 이름: 청춘 스케치
- 프로젝트 설명: 전국 대학 동아리 일정관리 및 홍보 커뮤니티

<br/>
<br/>

# 2. Team Members (팀원 및 팀 소개)
| 최민호 | 구민경 | 권태영 | 이감재 | 전예지 | 이명진 |
|:------:|:------:|:------:|:------:|

| PM | DE | FE | FE | BE | BE |

<br/>
<br/>

# 3. Key Features (주요 기능)
- **회원가입**:
  - 회원가입 시 DB에 유저정보가 등록됩니다.

- **로그인**:
  - 사용자 인증 정보를 통해 로그인합니다.

- **검색페이지**:
  - 대학 내 동아리를 검색할 수 있습니다.
  - 검색 시 해당 동아리가 업로드한 홍보글이 보여집니다.

- **스크랩**:
  - 홍보글 등록을 통해 동아리를 홍보할 수 있습니다.

- **알람**:
  - 새로운 동아리를 만들어 관리할 수 있습니다.

- **상세페이지**:
  - 동아리 홍보글에서 동아리 이름(링크)를 클릭하면 해당 동아리 프로필로 이동합니다.
  - 동아리 프로필에서는 동아리 소개, 동아리 활동사진 갤러리, 동아리 홍보글 기록관 등을 볼 수 있습니다.

<br/>
<br/>


# 5. Technology Stack (기술 스택)

## 5.1 Frotend
|  |  |  |
|-----------------|-----------------|-----------------|
| React    | tailwindcss   |javascript   | 

<br/>
마이아 DB 
## 5.2 Backend
|  |  |  |
|-----------------|-----------------|-----------------|
| Maria DB | Java | Spring | 
<br/>

## 5.4 Cooperation
|  |  |
|-----------------|-----------------|
| Git  | Notion | Discord | Slack |

<br/>

# 6. Project Structure (프로젝트 구조)
```plaintext
project/
├── public/
│   |─ vite.svg      # HTML 템플릿 파일
├── src/
│   ├── assets/              # 이미지, 폰트 등 정적 파일
│   ├── components/          # 재사용 가능한 UI 컴포넌트
│   ├── contexts/               # 각 페이지별 컴포넌트
│   ├── pages/               # 각 페이지별 컴포넌트
│   ├── services/               # 각 페이지별 컴포넌트
│   ├── App.js               # 메인 애플리케이션 컴포넌트
│   ├── index.css            # 전역 css 파일
│   ├── main.jsx    # firebase 인스턴스 초기화 파일
│   package-lock.json    # 정확한 종속성 버전이 기록된 파일로, 일관된 빌드를 보장
│   package.json         # 프로젝트 종속성 및 스크립트 정의
├── .gitignore               # Git 무시 파일 목록
└── README.md                # 프로젝트 개요 및 사용법
```

<br/>
<br/>

# 7. Development Workflow (개발 워크플로우)
## 브랜치 전략 (Branch Strategy)
우리의 브랜치 전략은 Git Flow를 기반으로 하며, 다음과 같은 브랜치를 사용합니다.

- Main Branch
  - 배포 가능한 상태의 코드를 유지합니다.
  - 모든 배포는 이 브랜치에서 이루어집니다.
  
- Feature / 기능이름
  - 팀원 각자의 개발 브랜치입니다.
  - 모든 기능 개발은 이 브랜치에서 이루어집니다.

<br/>
<br/>

