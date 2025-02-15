-- Categories
INSERT INTO categories (name, description) VALUES
('SaaS', '소프트웨어 서비스 제품'),
('Mobile Apps', '모바일 애플리케이션'),
('E-commerce', '전자상거래 솔루션'),
('AI/ML', '인공지능 및 머신러닝 제품'),
('Developer Tools', '개발자 도구 및 유틸리티');

-- Jobs
INSERT INTO jobs (position, overview, responsibilities, qualifications, benefits, skills, company_name, company_logo, company_location, apply_url, job_type, location, salary) VALUES
('Senior Frontend Developer', '최신 웹 기술을 활용한 개발', '프론트엔드 아키텍처 설계', '5년 이상 경력', '유연근무제', 'React, TypeScript', 'Tech Corp', 'https://example.com/logo1.png', 'Seoul', 'https://example.com/apply1', 'full-time', 'remote', '$100,000 - $150,000'),
('Backend Engineer', '확장 가능한 백엔드 시스템 개발', 'API 설계 및 구현', '3년 이상 경력', '원격근무', 'Node.js, PostgreSQL', 'Dev Inc', 'https://example.com/logo2.png', 'Busan', 'https://example.com/apply2', 'full-time', 'hybrid', '$70,000 - $100,000'),
('Product Designer', 'UX/UI 디자인', '사용자 경험 개선', '2년 이상 경력', '주4일제', 'Figma, Adobe XD', 'Design Co', 'https://example.com/logo3.png', 'Incheon', 'https://example.com/apply3', 'part-time', 'in-person', '$50,000 - $70,000'),
('Data Scientist', '데이터 분석 및 모델링', '머신러닝 모델 개발', '4년 이상 경력', '성과급', 'Python, TensorFlow', 'AI Labs', 'https://example.com/logo4.png', 'Daegu', 'https://example.com/apply4', 'full-time', 'hybrid', '$150,000 - $200,000'),
('DevOps Engineer', '인프라 관리 및 자동화', 'CI/CD 파이프라인 구축', '3년 이상 경력', '교육지원', 'AWS, Kubernetes', 'Cloud Systems', 'https://example.com/logo5.png', 'Daejeon', 'https://example.com/apply5', 'full-time', 'remote', '$100,000 - $150,000');

-- Products
INSERT INTO products (name, tagline, description, how_it_works, icon, url, stats, profile_id, category_id) VALUES
('CodeFlow', '개발 워크플로우 자동화', '개발자를 위한 자동화 도구', '클릭 한 번으로 설정', 'https://example.com/icon1.png', 'https://codeflow.dev', '{"views":100,"reviews":10}', 'ee52c892-b276-4815-8e35-3158c701b789', 1),
('DataSense', '데이터 시각화 플랫폼', '데이터를 통찰력으로 변환', '드래그 앤 드롭 인터페이스', 'https://example.com/icon2.png', 'https://datasense.io', '{"views":200,"reviews":15}', 'ee52c892-b276-4815-8e35-3158c701b789', 2),
('ShopMaster', '이커머스 관리 도구', '온라인 상점 관리 솔루션', '통합 대시보드', 'https://example.com/icon3.png', 'https://shopmaster.com', '{"views":150,"reviews":8}', 'ee52c892-b276-4815-8e35-3158c701b789', 3),
('AIAssist', 'AI 기반 작업 자동화', '업무 생산성 향상 도구', 'AI 기반 추천 엔진', 'https://example.com/icon4.png', 'https://aiassist.app', '{"views":300,"reviews":20}', 'ee52c892-b276-4815-8e35-3158c701b789', 4),
('DevKit', '개발자 생산성 도구', '코드 품질 향상 도구', '자동 코드 리뷰', 'https://example.com/icon5.png', 'https://devkit.tools', '{"views":250,"reviews":12}', 'ee52c892-b276-4815-8e35-3158c701b789', 5);

-- Topics
INSERT INTO topics (name, slug) VALUES
('Web Development', 'web-dev'),
('Mobile Development', 'mobile-dev'),
('Data Science', 'data-science'),
('DevOps', 'devops'),
('Design', 'design');

-- Posts
INSERT INTO posts (title, content, topic_id, profile_id) VALUES
('React 최적화 기법', 'React 애플리케이션 성능 최적화 방법', 1, 'ee52c892-b276-4815-8e35-3158c701b789'),
('iOS 앱 개발 팁', 'Swift UI를 사용한 iOS 앱 개발', 2, 'ee52c892-b276-4815-8e35-3158c701b789'),
('머신러닝 입문', '머신러닝 기초 개념 설명', 3, 'ee52c892-b276-4815-8e35-3158c701b789'),
('쿠버네티스 가이드', '쿠버네티스 클러스터 관리', 4, 'ee52c892-b276-4815-8e35-3158c701b789'),
('UI/UX 디자인 원칙', '효과적인 사용자 인터페이스 설계', 5, 'ee52c892-b276-4815-8e35-3158c701b789');

-- Teams
INSERT INTO teams (product_name, team_size, equity_split, product_stage, roles, product_description) VALUES
('TechFlow', 5, 20, 'mvp', 'Frontend, Backend, DevOps', 'Developer productivity platform'),
('DataViz', 3, 30, 'prototype', 'Data Scientist, UI Designer', 'Data visualization tool'),
('CloudOps', 4, 25, 'launched', 'Cloud Engineer, Frontend', 'Cloud management solution'),
('AIBot', 2, 50, 'idea', 'ML Engineer, Backend', 'AI chatbot platform'),
('DevTools', 3, 33, 'prototype', 'Full Stack, Designer', 'Developer toolkit');

-- Bridge Tables (Composite Primary Keys)
INSERT INTO product_upvotes (product_id, profile_id) VALUES (1, 'ee52c892-b276-4815-8e35-3158c701b789');
INSERT INTO post_upvotes (post_id, profile_id) VALUES (1, 'ee52c892-b276-4815-8e35-3158c701b789');
INSERT INTO gpt_ideas_likes (gpt_idea_id, profile_id) VALUES (1, 'ee52c892-b276-4815-8e35-3158c701b789');

-- Reviews
INSERT INTO reviews (product_id, profile_id, rating, review) VALUES
(1, 'ee52c892-b276-4815-8e35-3158c701b789', 5, '훌륭한 제품입니다'),
(2, 'ee52c892-b276-4815-8e35-3158c701b789', 4, '사용하기 쉽습니다'),
(3, 'ee52c892-b276-4815-8e35-3158c701b789', 5, '매우 유용합니다'),
(4, 'ee52c892-b276-4815-8e35-3158c701b789', 4, '추천합니다'),
(5, 'ee52c892-b276-4815-8e35-3158c701b789', 5, '완벽한 솔루션입니다');

-- Get Ideas
INSERT INTO get_ideas (idea, views) VALUES
('AI 기반 코드 리뷰 도구', 100),
('실시간 협업 플랫폼', 150),
('자동화된 테스트 도구', 80),
('클라우드 비용 최적화 도구', 120),
('개발자 생산성 분석 도구', 90);


-- Categories
INSERT INTO categories (name, description) VALUES
('SaaS', '소프트웨어 서비스 제품'),
('Mobile Apps', '모바일 애플리케이션'),
('E-commerce', '전자상거래 솔루션'),
('AI/ML', '인공지능 및 머신러닝 제품'),
('Developer Tools', '개발자 도구 및 유틸리티');

-- Jobs
INSERT INTO jobs (position, overview, responsibilities, qualifications, benefits, skills, company_name, company_logo, company_location, apply_url, job_type, location, salary) VALUES
('Senior Frontend Developer', '최신 웹 기술을 활용한 개발', '프론트엔드 아키텍처 설계', '5년 이상 경력', '유연근무제', 'React, TypeScript', 'Tech Corp', 'https://example.com/logo1.png', 'Seoul', 'https://example.com/apply1', 'full-time', 'remote', '$100,000 - $150,000'),
('Backend Engineer', '확장 가능한 백엔드 시스템 개발', 'API 설계 및 구현', '3년 이상 경력', '원격근무', 'Node.js, PostgreSQL', 'Dev Inc', 'https://example.com/logo2.png', 'Busan', 'https://example.com/apply2', 'full-time', 'hybrid', '$70,000 - $100,000'),
('Product Designer', 'UX/UI 디자인', '사용자 경험 개선', '2년 이상 경력', '주4일제', 'Figma, Adobe XD', 'Design Co', 'https://example.com/logo3.png', 'Incheon', 'https://example.com/apply3', 'part-time', 'in-person', '$50,000 - $70,000'),
('Data Scientist', '데이터 분석 및 모델링', '머신러닝 모델 개발', '4년 이상 경력', '성과급', 'Python, TensorFlow', 'AI Labs', 'https://example.com/logo4.png', 'Daegu', 'https://example.com/apply4', 'full-time', 'hybrid', '$150,000 - $200,000'),
('DevOps Engineer', '인프라 관리 및 자동화', 'CI/CD 파이프라인 구축', '3년 이상 경력', '교육지원', 'AWS, Kubernetes', 'Cloud Systems', 'https://example.com/logo5.png', 'Daejeon', 'https://example.com/apply5', 'full-time', 'remote', '$100,000 - $150,000');

-- Products
INSERT INTO products (name, tagline, description, how_it_works, icon, url, stats, profile_id, category_id) VALUES
('CodeFlow', '개발 워크플로우 자동화', '개발자를 위한 자동화 도구', '클릭 한 번으로 설정', 'https://example.com/icon1.png', 'https://codeflow.dev', '{"views":100,"reviews":10}', 'ee52c892-b276-4815-8e35-3158c701b789', 1),
('DataSense', '데이터 시각화 플랫폼', '데이터를 통찰력으로 변환', '드래그 앤 드롭 인터페이스', 'https://example.com/icon2.png', 'https://datasense.io', '{"views":200,"reviews":15}', 'ee52c892-b276-4815-8e35-3158c701b789', 2),
('ShopMaster', '이커머스 관리 도구', '온라인 상점 관리 솔루션', '통합 대시보드', 'https://example.com/icon3.png', 'https://shopmaster.com', '{"views":150,"reviews":8}', 'ee52c892-b276-4815-8e35-3158c701b789', 3),
('AIAssist', 'AI 기반 작업 자동화', '업무 생산성 향상 도구', 'AI 기반 추천 엔진', 'https://example.com/icon4.png', 'https://aiassist.app', '{"views":300,"reviews":20}', 'ee52c892-b276-4815-8e35-3158c701b789', 4),
('DevKit', '개발자 생산성 도구', '코드 품질 향상 도구', '자동 코드 리뷰', 'https://example.com/icon5.png', 'https://devkit.tools', '{"views":250,"reviews":12}', 'ee52c892-b276-4815-8e35-3158c701b789', 5);

-- Topics
INSERT INTO topics (name, slug) VALUES
('Web Development', 'web-dev'),
('Mobile Development', 'mobile-dev'),
('Data Science', 'data-science'),
('DevOps', 'devops'),
('Design', 'design');

-- Posts
INSERT INTO posts (title, content, topic_id, profile_id) VALUES
('React 최적화 기법', 'React 애플리케이션 성능 최적화 방법', 1, 'ee52c892-b276-4815-8e35-3158c701b789'),
('iOS 앱 개발 팁', 'Swift UI를 사용한 iOS 앱 개발', 2, 'ee52c892-b276-4815-8e35-3158c701b789'),
('머신러닝 입문', '머신러닝 기초 개념 설명', 3, 'ee52c892-b276-4815-8e35-3158c701b789'),
('쿠버네티스 가이드', '쿠버네티스 클러스터 관리', 4, 'ee52c892-b276-4815-8e35-3158c701b789'),
('UI/UX 디자인 원칙', '효과적인 사용자 인터페이스 설계', 5, 'ee52c892-b276-4815-8e35-3158c701b789');

-- Teams
INSERT INTO teams (product_name, team_size, equity_split, product_stage, roles, product_description) VALUES
('TechFlow', 5, 20, 'mvp', 'Frontend, Backend, DevOps', 'Developer productivity platform'),
('DataViz', 3, 30, 'prototype', 'Data Scientist, UI Designer', 'Data visualization tool'),
('CloudOps', 4, 25, 'launched', 'Cloud Engineer, Frontend', 'Cloud management solution'),
('AIBot', 2, 50, 'idea', 'ML Engineer, Backend', 'AI chatbot platform'),
('DevTools', 3, 33, 'prototype', 'Full Stack, Designer', 'Developer toolkit');

-- Bridge Tables (Composite Primary Keys)
INSERT INTO product_upvotes (product_id, profile_id) VALUES (1, 'ee52c892-b276-4815-8e35-3158c701b789');
INSERT INTO post_upvotes (post_id, profile_id) VALUES (1, 'ee52c892-b276-4815-8e35-3158c701b789');
INSERT INTO gpt_ideas_likes (gpt_idea_id, profile_id) VALUES (1, 'ee52c892-b276-4815-8e35-3158c701b789');

-- Reviews
INSERT INTO reviews (product_id, profile_id, rating, review) VALUES
(1, 'ee52c892-b276-4815-8e35-3158c701b789', 5, '훌륭한 제품입니다'),
(2, 'ee52c892-b276-4815-8e35-3158c701b789', 4, '사용하기 쉽습니다'),
(3, 'ee52c892-b276-4815-8e35-3158c701b789', 5, '매우 유용합니다'),
(4, 'ee52c892-b276-4815-8e35-3158c701b789', 4, '추천합니다'),
(5, 'ee52c892-b276-4815-8e35-3158c701b789', 5, '완벽한 솔루션입니다');

-- Get Ideas
INSERT INTO get_ideas (idea, views) VALUES
('AI 기반 코드 리뷰 도구', 100),
('실시간 협업 플랫폼', 150),
('자동화된 테스트 도구', 80),
('클라우드 비용 최적화 도구', 120),
('개발자 생산성 분석 도구', 90);