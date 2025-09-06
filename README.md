<br/>
<br/>

# 1. Project Overview (프로젝트 개요)
- 프로젝트 이름: 청춘 스케치
- 프로젝트 설명: AI 추천기반 청년 정책 추천 시스템 

<br/>
<br/>

# 2. Team Members (팀원 및 팀 소개)
| 최민호 | 구민경 | 권태영 | 이감재 | 전예지 | 이명진 |

| PM | DE | FE | FE | BE | BE |

<br/>
<br/>

# 3. Key Features (주요 기능)
- **회원가입**
- **로그인**
- **검색페이지**
- **스크랩**
- **알람**
- **상세페이지**

<br/>
<br/>


# 4. Technology Stack (기술 스택)

## 4.1 Frotend
|  |  |  |
|-----------------|-----------------|-----------------|
| React    | tailwindcss   | javascript   | 

<br/>


## 4.2 Backend
|  |  |  |
|-----------------|-----------------|-----------------|
| Maria DB | Java | Spring | 
<br/>

## 4.3 Cooperation
|  |  |  |  |  
|-----------------|-----------------|-----------------|-----------------|
| Git  | Notion | Discord | Slack |

<br/>

# 5. Project Structure (프로젝트 구조)
```plaintext
project/
├── public/
│   |─ vite.svg      # HTML 템플릿 파일
├── src/
│   ├── assets/              # 이미지, 아이콘 등  파일
│   ├── components/          # 재사용 가능한 UI 컴포넌트
│   ├── contexts/               # 각 페이지별 컴포넌트
│   ├── pages/               # 각 페이지
│   ├── services/               # 서비스에서 사용하는 api
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

# 6. Development Workflow (개발 워크플로우)
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

