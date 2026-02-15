# Cloud Between Us — 프로젝트 규칙

이 프로젝트를 수정·추가할 때 아래 규칙을 따른다.

---

## 1. 프로젝트 한 줄 요약

- **Cloud Between Us**: SvelteKit 기반 구름 성향. "구름 타입"으로 자신/커플 궁합을 시각화. **숫자(퍼센트)로 측정하지 않고, 하늘/구름 서사로 표현**한다.

---

## 2. 브랜드 원칙

- **브랜드 우선**: 모든 UI/카피는 브랜드 정체성(톤앤매너, 세계관)을 반영한다.
- **금지**: "성격 유형", "궁합도 85%" 같은 심리·수치 표현. 일반적인 궁합 테스트 톤 사용.
- **권장**: 구름/하늘 은유, 감성 카피 (예: "Some clouds collide. Yours blend."), 브랜드 컬러 변수 사용.

---

## 3. 브랜드 CSS 변수 (반드시 사용)

```css
--sky-blue: #a7d8f5;
--warm-peach: #ffc6a8;
--off-white: #fafaf8;
--text-dark: #111827;
--text-gray: #6b7280;
--border-light: #e8e8e6;
--radius-sm: 16px;
--radius-md: 24px;
--radius-lg: 32px;
--shadow-soft: 0 4px 24px rgba(0, 0, 0, 0.06);
--transition-smooth: 0.3s ease-out;
```

- 인라인 색상 대신 `var(--sky-blue)` 등 위 변수 사용.

---

## 4. 타입 (src/lib/types/cloud.ts)

- **CloudType**: `'sunlit' | 'mist' | 'storm' | 'dawn' | 'wild' | 'shade'`
- **CloudProfile**: type, emoji, name, subtitle, keywords[4], lore, traits{ strengths, shadows }
- **CoupleChemistry**: user, partner, skyName, phenomenon, narrative, warning
- **TestQuestion**: id, **question**(문자열), options: [{ text, cloudType }]

---

## 5. 디렉터리 구조

```
src/
├── app.css                 # 브랜드 CSS 변수
├── lib/
│   ├── components/         # UI (예: result/CloudReveal.svelte)
│   ├── data/               # cloudProfiles, chemistryMatrix, questions
│   ├── stores/
│   ├── utils/              # calculateCloudType 등
│   └── types/              # cloud.ts
└── routes/                 # +page.svelte, +page.ts
```

- 결과 페이지: URL에서 `answers` 쿼리 파라미터로 답변 수신 → `calculateCloudType` → `CLOUD_PROFILES[cloudType]`로 프로필 전달.

---

## 6. 체크리스트 (코드 생성·수정 시)

- [ ] CloudType/CloudProfile 등 타입 일치
- [ ] 색상은 CSS 변수만 사용
- [ ] 카피는 세계관/톤 유지 (숫자·성격 유형 X)
- [ ] TestQuestion은 `question` 필드 사용
- [ ] 결과는 answers 기반 계산, type 쿼리 단독 전달 금지
