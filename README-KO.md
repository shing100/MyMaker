# My Maker
이 프로젝트는 React Router를 사용하여 전체 스택 React 애플리케이션을 구축하기 위한 현대적이고 생산 준비가 완료된 템플릿입니다. 이 템플릿은 서버 측 렌더링, 핫 모듈 교체, 자산 번들링 및 최적화, 데이터 로딩 및 변형, TypeScript 기본 제공, TailwindCSS를 통한 스타일링 등의 기능을 제공합니다.

## 환경 설정
- 사용된 환경
    - Tools
        - Cursor
    - Language
        - TypeScript
    - Framework & Library
        - React
        - React Router@7.0.1
        - TailwindCSS [https://tailwindcss.com/docs/installation]
        - Shadcn/UI [https://ui.shadcn.com/docs/components/separator]
        - Zod [https://zod.dev/docs/getting-started/installation]
        - Luxon [https://moment.github.io/luxon/docs/manual/installation]
            - 날짜 및 시간 처리
            - npm install --save luxon            
            - npm install @types/luxon -D
]

### 의존성 설치

- 프로젝트 생성
    - npx create-react-router@7.0.1

- 프로젝트 설정
    - 불필요한 docker 설정 제거
    - 불필요한 파일 제거

- 프로젝트 구조
    - 프로젝트 구조 설정
        - react-router.config.ts
        - components.js

ex) npx shadcn@latest add separator


### 이슈
- [tailwindcss v4 버전 이슈](https://stackoverflow.com/questions/79383705/cannot-build-frontend-using-vite-tailwindcss-with-postcss)
