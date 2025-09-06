<br/>
<br/>

# 1. Project Overview (프로젝트 개요)
- 프로젝트 이름: 청춘 스케치
- 프로젝트 설명: AI 추천기반 청년 정책 추천 시스템 

<br/>
<br/>

# 2. Team Members (팀원 및 팀 소개)

| 이름 | 역할 |
|------|------|
| 최민호 | PM |
| 구민경 | DE |
| 권태영 | FE |
| 이감재 | FE |
| 전예지 | BE |
| 이명진 | BE |

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

### 4.1 Frotend
[![React](https://img.shields.io/badge/React-61DAFB.svg?&style=for-the-badge&logo=react&logoColor=black)]()
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E.svg?&style=for-the-badge&logo=javascript&logoColor=black)]()
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4.svg?&style=for-the-badge&logo=tailwindcss&logoColor=white)]()

<br/>


### 4.2 Backend
[![mariadb](https://img.shields.io/badge/MariaDB-003545.svg?&style=for-the-badge&logo=mariadb&logoColor=white)]()
[![spring](https://img.shields.io/badge/Spring-6DB33F.svg?&style=for-the-badge&logo=spring&logoColor=white)]()
[![java](https://img.shields.io/badge/JAVA-FC4C02.svg?&style=for-the-badge&logo=java&logoColor=white)]()


<br/>

### 4.3 Cooperation
[![GitHub](https://img.shields.io/badge/GitHub-181717.svg?&style=for-the-badge&logo=github&logoColor=white)]()
[![Notion](https://img.shields.io/badge/Notion-000000.svg?&style=for-the-badge&logo=notion&logoColor=white)]()
[![Figma](https://img.shields.io/badge/Figma-F24E1E.svg?&style=for-the-badge&logo=figma&logoColor=white)]()
[![slack](https://img.shields.io/badge/slack-4A154B.svg?&style=for-the-badge&logo=slack&logoColor=white)]()

<br/>

# 5. Project Structure (프로젝트 구조)
```plaintext
src/
├── components/
│   ├── auth/           # 인증 관련 컴포넌트들
│   ├── common/         # 공통 컴포넌트들
│   └── layout/         # 레이아웃 컴포넌트들
├── pages/              # 페이지 컴포넌트들
├── services/           # API 서비스
├── contexts/           # React Context들
├── assets/             # 이미지, 아이콘 등
│   ├── icons/          # SVG 아이콘들
│   └── images/         # 기타 이미지 파일들
└── hooks/              # 커스텀 훅 (현재 비어있음)
```

<br/>
<br/>

# 6. Development Workflow (개발 워크플로우)
### 브랜치 전략 (Branch Strategy)
우리의 브랜치 전략은 Git Flow를 기반으로 하며, 다음과 같은 브랜치를 사용합니다.

- Main Branch
  - 배포 가능한 상태의 코드를 유지합니다.
  - 모든 배포는 이 브랜치에서 이루어집니다.
  
- Feature / 기능이름
  - 팀원 각자의 개발 브랜치입니다.
  - 모든 기능 개발은 이 브랜치에서 이루어집니다.

<br/>
<br/>

