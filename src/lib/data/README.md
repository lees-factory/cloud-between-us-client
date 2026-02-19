# data.json 참조 규칙 (DB 동일 형태)

DB에 넣었을 때와 **같은 경로 형태**로 참조할 수 있도록 키를 정규화해 두었습니다.

## 키 규칙

- **언더스코어 사용**: 객체 키는 하이픈(`-`) 대신 언더스코어(`_`) 사용.
  - 예: `sunlit_mist`, `mist_sunlit`, `fast_slow`, `warm_cool`, `intense_any`
- **locale 순서**: 다국어 객체는 항상 `ko` → `en` 순서.

## Dot path 예시

| 경로                                               | 설명                                |
| -------------------------------------------------- | ----------------------------------- |
| `pair_meta.sunlit_mist.phenomenonName.ko`          | 궁합 메타 (sunlit-mist) 한글 현상명 |
| `pair_meta.sunlit_mist.storyBeats.openingImage.en` | 스토리 비트 오프닝 영문             |
| `copy_pool.seasonFirstMeet.fast_slow.ko`           | 첫만남 문구 (fast-slow) 한글        |
| `copy_pool.frictionPatterns.pace_mismatch.en`      | 마찰 패턴 pace_mismatch 영문        |
| `chemistry_matrix.sunlit_mist.skyName`             | 궁합 매트릭스 하늘 이름             |
| `cloud_profiles.ko.sunlit.name`                    | 구름 프로필 (한국어, sunlit) 이름   |
| `cloud_meta.sunlit.displayName.ko`                 | 구름 메타 (sunlit) 한글 표기명      |

## 코드에서 참조

```ts
import { data, getByPath, toDataKey } from '$lib/data/ref';

// path로 직접 조회 (DB 쿼리와 동일한 path 문자열 사용 가능)
const name = getByPath<string>(data, 'pair_meta.sunlit_mist.phenomenonName.ko');

// type pair 문자열(API 등에서 "sunlit-mist")을 data 키로 변환
const key = toDataKey('sunlit-mist'); // 'sunlit_mist'
const meta = data.pair_meta[key];
```

## 정제 스크립트

키/중복/공백/ko·en 순서 정제: `node scripts/refine-data.cjs`
