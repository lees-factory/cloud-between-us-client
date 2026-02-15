---
name: cbu-premium-static-report
description: Cloud Between Us에서 유료($2.99) 구매 유저에게 제공할 프리미엄 리포트를 LLM 없이 정적 메타데이터로 생성한다. 6×6(36) 조합을 규칙+템플릿+메타데이터로 커버하며, 세계관 톤(하늘/구름 서사)과 금지 규칙(진단/숫자/퍼센트)을 강제한다. 유료 리포트 카피/데이터/생성 로직/검증/유지보수 작업 시 사용.
---

# Cloud Between Us — Premium Static Report Skill (No LLM)

## 0. 목적

- 유료 결제($2.99) 유저에게 **프리미엄 리포트** 제공
- LLM 없이 **정적 메타데이터 + 규칙 엔진 + 템플릿**으로 36조합 생성
- “팔리는 느낌”은 **문장 품질 + 구성/UX + 저장가치**로 만든다

---

## 1. 절대 규칙 (브랜드/카피)

### 금지
- 퍼센트/점수/수치형 측정: “85%” “궁합도” “점수” 등
- 심리 진단 톤: “회피형/불안형/MBTI/성격 유형” 등
- 과장/단정: “운명” “영원히” “100%” “절대” 등

### 권장
- 하늘/구름/공기/바람/기후 은유
- 짧은 문장 + 여백 + 이미지
- 감성 85% + 실용 15%
- “진단”이 아니라 “관찰”처럼

---

## 2. 출력물 정의 (유료 리포트 구성)

유료 리포트는 아래 4블록을 고정한다.

1) **Full Couple Sky Story** (4단락)
- Opening Image (몰입)
- Emotional Dynamic (리듬/대비)
- Hidden Strength (강점 한 방)
- Growth Arc (미래 이미지)

2) **When You Fight** (실용 15% / 고정 3파트)
- When tension rises… (You tend to / They tend to)
- Friction truth (이슈가 아니라 “페이스/타이밍”)
- Try this instead (행동 1개 강하게)

3) **The Shelter They Reach For**
- They feel safe when (3~5개)
- You feel safe when (3~5개)
- Closing line 1개

4) **How to Make Your Sky Brighter**
- Micro actions 3개 (각 title + body)
- Closing line 1개
- (UX: 체크박스/스크린샷 각)

+ **Premium Share Card copy**
- tagline 1줄
- caption 1줄

---

## 3. 데이터 설계 (정적 메타데이터)

### 3.1 CloudType (내부 타입 고정)
- `sunlit | mist | storm | dawn | wild | shade`

> UI 표시 이름은 바꿔도 되지만 내부 타입은 절대 변경하지 않는다.

---

### 3.2 타입 메타 (CLOUD_META)
파일: `src/lib/data/cloud-meta.ts`

각 타입은 “사랑의 추진력 / 갈등 반응 / 안전 조건 / 그림자”를 갖는다.

예시 스키마:

```ts
export type CloudType = "sunlit" | "mist" | "storm" | "dawn" | "wild" | "shade";

export interface CloudMeta {
  displayName: { en: string; ko: string }; // UI용
  keywords: { en: string[]; ko: string[] }; // 결과 문장에 끼워넣기
  loveDrive: { en: string; ko: string }; // “어떤 방식으로 사랑이 움직이는가”
  conflictReaction: { en: string; ko: string }; // “갈등 시 반응”
  pace: "fast" | "steady" | "slow"; // 감정 속도
  temperature: "warm" | "cool" | "intense"; // 감정 온도(비유용)
  safetyNeeds: { en: string[]; ko: string[] }; // 안전감 조건
  shadows: { en: string[]; ko: string[] }; // 반복되는 함정(진단X, 관찰O)
  trySuggestion: { en: string; ko: string }; // 행동 제안(한 문장)
}
```

---

### 3.3 조합 메타 (PAIR_META) — “차등 전략”

파일: `src/lib/data/pair-meta.ts`

* 36조합 모두를 “완전 수동”으로 쓰지 않는다.
* 대신 **S-tier(잘 팔리는 조합)** 12개 정도만 수동으로 “현상 이름 + 핵심 비트”를 보강한다.
* 나머지 조합은 규칙으로 생성하되, **필수 최소 필드(phenomenonName)**는 반드시 존재하도록.

스키마 예시:

```ts
export interface PairMetaOverride {
  phenomenonName?: { en: string; ko: string }; // 하늘 현상 이름 (필수 권장)
  vibeTags?: { en: string[]; ko: string[] }; // 선택(2~5)
  storyBeats?: Partial<{
    openingImage: { en: string; ko: string };
    emotionalDynamic: { en: string; ko: string };
    hiddenStrength: { en: string; ko: string };
    growthArc: { en: string; ko: string };
  }>;
  fightOverride?: Partial<{
    frictionTruth: { en: string; ko: string };
    tryThisInstead: { en: string; ko: string };
  }>;
}
```

키 규칙:

* `pairKey = "${user}-${partner}"` (예: `sunlit-mist`)

> 대칭 처리 정책을 명확히 한다:
>
> * “관계의 서사”는 대칭일 수 있지만,
> * “You/They” 표현은 유저 관점이므로 `sunlit-mist`와 `mist-sunlit`은 별개로 둔다(권장).

---

## 4. 생성 엔진 설계 (Rule + Template)

### 4.1 생성 단계

1. `resolvePairMeta(user, partner, locale)`

* `PAIR_META_OVERRIDE[pairKey]`가 있으면 우선 적용
* 없으면 규칙 생성로 폴백

2. `buildPremiumReport(user, partner, locale)`

* Full Story(4단락) 생성
* Fight 섹션 생성
* Shelter 섹션 생성
* Brighter(3 micro actions) 생성
* Share card copy 생성

3. `validate(report)`

* 문자열 공백/금칙어/길이/문단수 검증
* 실패 시: 안전한 폴백 템플릿으로 대체

---

### 4.2 템플릿: Full Story (4단락)

**원칙**

* 문장 짧게
* 1문단 = 2~4문장
* “너는 ~형” 금지
* “기후가 된다/공기가 바뀐다/빛이 스민다” 같은 은유는 허용

템플릿 예시(EN):

1. Opening Image

* `{phenomenonLine}`
* `{softeningLine}`

2. Emotional Dynamic

* `You {loveDriveUser}.`
* `They {loveDrivePartner}.`

3. Hidden Strength

* `Together, {strengthLine}.`
* `{rareLine}`

4. Growth Arc

* `{growthLine}`
* `{finalSoftTag}`

KO도 같은 구조를 유지한다.

> 조합별 “현상 이름”이 있으면 Opening에 반드시 사용한다.

---

### 4.3 템플릿: Fight

고정 구조:

* When tension rises…

  * You tend to {user.conflictReaction}
  * They tend to {partner.conflictReaction}
* Friction truth:

  * pace가 다르면: “이슈가 아니라 페이스”
  * temperature가 다르면: “열기 vs 차가움” 같은 은유 한 줄
* Try this instead:

  * 기본은 `user.trySuggestion` 또는 pair override

> 행동 제안은 “1개만” 강하게. 여러 개 주면 가치가 떨어진다.

---

## 4.4 템플릿: Shelter

* They feel safe when: partner.safetyNeeds에서 3개 추출
* You feel safe when: user.safetyNeeds에서 3개 추출
* Closing line: “Safety isn’t loud. It’s consistent.” 류의 고정 문장 풀에서 랜덤(시드 기반)

---

## 4.5 템플릿: Brighter (3 Micro Actions)

항상 3개 고정.

기본 액션 풀(권장):

1. Appreciation (구체적 고마움)
2. Pace (감정 속도 늦추기/여백)
3. Ritual (작은 의식)

각 액션은

* title: 짧게
* body: 2~3문장, 스크린샷 각 나오게

---

## 4.6 Share Card Copy

* tagline: 1줄 (현상 이름의 여운)
* caption: 1줄 (서비스명 + 공유 욕구)

예:

* EN: `Some skies linger.`
* KO: `어떤 하늘은 오래 남아.`

---

## 5. 검증/린트 (품질 강제)

### 5.1 금칙어 리스트

파일: `src/lib/data/banned-phrases.ts`

* 진단 단어: “회피형, 불안형, 성격유형, MBTI, 궁합도, 점수, 퍼센트…”
* 과장 단정: “운명, 영원, 100%, 절대…”
* 치료/상담 뉘앙스 과다: “치료, 진단, 처방” 등

### 5.2 검증 규칙

* fullStory: 4단락 정확히
* microActions: 3개 정확히
* safety lists: 3~5개
* 문장 길이 제한(너무 길면 잘라내거나 교체)
* 금칙어 포함 시: 해당 라인만 교체(폴백 문장 풀 사용)

---

## 6. 캐시/저장 전략 (정적 엔진에서도 필수)

* 유료 결과는 “영구 소장”이므로 반드시 저장
* key: `premium:${locale}:${user}:${partner}:v1:${seed}`
* seed는 동일 조합에서도 문장 다양화를 가능하게 함(선택)

> 결제 이후 최초 1회 생성 → 저장 → 재진입 시 그대로 보여주기

---

## 7. 유지보수 전략

### 우선순위

1. S-tier 12조합: 현상 이름 + opening + strength 문장 퀄리티 집중
2. 나머지: 규칙 기반으로 안정적으로
3. CS/리텐션 보고 “자주 결제되는 조합”부터 수동 보강 확대

### 변경 시

* 템플릿/문장 풀 수정하면 `version(v1→v2)` 올려 캐시 분리
* 기존 구매자 리포트는 “그때의 하늘”로 유지하는 게 감성적으로도 좋음(권장)

---

## 8. 파일 구조 권장

```
src/lib/
  data/
    cloud-meta.ts
    pair-meta.ts
    phenomenon-pool.ts
    copy-pool.ts
    banned-phrases.ts
  utils/
    premium/
      build-premium-report.ts
      resolve-pair-meta.ts
      lint-report.ts
      seed.ts
```

---

## 9. Done 정의(완성 기준)

* 36조합 모두 리포트 생성 가능
* 금칙어/수치/진단 표현 0%
* 한 번 결제하면 “저장하고 싶은 글” 느낌
* share card 카피가 과하지 않고, 자랑하고 싶게

---

## 10. 작업 시 체크리스트

* [ ] 내부 CloudType 변경 없음
* [ ] UI 이름 변경은 displayName만
* [ ] 4블록 구조 유지
* [ ] 행동 제안은 1개 강하게
* [ ] 금칙어 린트 통과
* [ ] 캐시/버전 관리 포함
