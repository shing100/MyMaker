# 위메이크(WeMake)

위메이크는 React Router 7을 기반으로 한 현대적이고 생산성 높은 풀스택 React 애플리케이션입니다. 제품, 아이디어, 커뮤니티, 팀, 직업 등 다양한 기능을 제공하는 메이커 커뮤니티 플랫폼입니다.

## 주요 기능

- 🚀 서버 사이드 렌더링(SSR)
- ⚡️ 핫 모듈 교체(HMR)
- 📦 자산 번들링 및 최적화
- 🔄 데이터 로딩 및 뮤테이션
- 🔒 TypeScript 기본 지원
- 🎨 TailwindCSS + Shadcn UI를 통한 현대적 스타일링
- 💾 Supabase를 활용한 데이터베이스 관리
- 🌐 다양한 기능: 제품, 아이디어, 커뮤니티, 팀, 직업 등
- 📖 React Router 7 기반 라우팅 구현

## 프로젝트 구조

프로젝트는 다음과 같은 주요 디렉토리 구조를 가지고 있습니다:

```
app/
  ├── common/           # 공통 컴포넌트 및 페이지
  ├── features/         # 주요 기능별 모듈
  │    ├── auth/        # 인증 관련 기능
  │    ├── community/   # 커뮤니티 관련 기능
  │    ├── ideas/       # 아이디어 관련 기능
  │    ├── jobs/        # 일자리 관련 기능 
  │    ├── products/    # 제품 관련 기능
  │    ├── teams/       # 팀 관련 기능
  │    └── users/       # 사용자 관련 기능
  ├── hooks/            # 커스텀 훅
  ├── lib/              # 유틸리티 함수
  ├── prompt/           # 프롬프트 관련 기능
  ├── sql/              # SQL 쿼리
  ├── app.css           # 전역 스타일
  ├── db.ts             # 데이터베이스 설정
  ├── root.tsx          # 루트 레이아웃
  ├── routes.ts         # 라우트 정의
  └── supa-client.ts    # Supabase 클라이언트
```

## 시작하기

### 설치

의존성 설치:

```bash
npm install
```

### 개발

HMR이 적용된 개발 서버 시작:

```bash
npm run dev
```

애플리케이션은 `http://localhost:5173`에서 접근할 수 있습니다.

### 데이터베이스 관련 명령어

```bash
# 데이터베이스 타입 생성
npm run db:typegen

# 데이터베이스 마이그레이션
npm run db:migrate

# 데이터베이스 스키마 생성
npm run db:generate

# 데이터베이스 스튜디오 실행
npm run db:studio
```

## 빌드 및 배포

프로덕션 빌드 생성:

```bash
npm run build
```

## 기술 스택

- **언어**: TypeScript
- **프레임워크**: React, React Router 7
- **스타일링**: TailwindCSS, Shadcn UI
- **데이터베이스**: Supabase
- **라이브러리**:
  - Zod: 데이터 유효성 검사
  - Luxon: 날짜 및 시간 처리
  - Recharts: 차트 시각화
  - Drizzle ORM: 데이터베이스 ORM

## 주요 기능 설명

- **제품 관리**: 제품 등록, 검색, 리더보드, 리뷰 등
- **아이디어**: 아이디어 공유 및 토론
- **커뮤니티**: 게시글 작성, 댓글, 소통
- **팀**: 팀 생성 및 관리
- **직무**: 구인 구직 게시판
- **사용자**: 프로필 관리, 대시보드, 메시지, 알림 등

## 알려진 이슈

- tailwindcss v4 버전 관련 이슈 (참고: [스택오버플로우](https://stackoverflow.com/questions/79383705/cannot-build-frontend-using-vite-tailwindcss-with-postcss))
- Supabase 라이브러리 호환성: `@supabase/supabase-js@2.47.5` 버전으로 다운그레이드 시 `!inner`가 제대로 동작

---

## Storage Policy
- bucket_id = 'avatars' AND (storage.foldername(name))[1] = (auth.uid())::text
