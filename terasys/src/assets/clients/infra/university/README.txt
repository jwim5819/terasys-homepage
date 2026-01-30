# University Client Logos (대학교 고객사 로고)

This folder contains logo images for university clients (colleges, academic institutions).
이 폴더에는 대학교 고객사(대학, 학술기관)의 로고 이미지가 저장됩니다.

---

## 📁 File Naming Format (파일 이름 형식)

Files must follow this sequential naming pattern:
- **img-1**.[extension]
- **img-2**.[extension]
- **img-3**.[extension]
- **img-N**.[extension] (계속 순차적으로)

### Examples (예시):
```
img-1.png
img-2.jpg
img-3.svg
img-4.png
img-5.jpeg
```

**Important (중요)**:
- Numbers must be sequential (1, 2, 3...) / 번호는 순차적이어야 합니다
- No gaps in numbering (img-1, img-3 will only load img-1) / 번호에 빈칸이 있으면 안됩니다
- The system stops scanning after 3 consecutive missing files / 3개 연속 파일이 없으면 스캔 중단

---

## 🎨 Supported File Formats (지원 형식)

- ✅ `.png` - Recommended for logos with transparency (투명 배경 로고에 권장)
- ✅ `.jpg` / `.jpeg` - For photo-based logos (사진 기반 로고용)
- ✅ `.svg` - Best for scalable vector logos (벡터 로고에 최적)

---

## 📐 Recommended Image Size (권장 이미지 크기)

- **Width (가로)**: 150-200px
- **Height (세로)**: 80-120px
- **Aspect Ratio (비율)**: Maintain original logo proportions (원본 비율 유지)
- **Background (배경)**: Transparent PNG recommended (투명 PNG 권장)

---

## 🚀 How to Add Logos (로고 추가 방법)

### Step 1: Prepare Logo Image (이미지 준비)
- Collect client logo files / 고객사 로고 파일 수집
- Optimize file size (< 100KB recommended) / 파일 크기 최적화 (100KB 이하 권장)

### Step 2: Rename Files (파일 이름 변경)
- Find the next available number / 다음 사용 가능한 번호 찾기
- Rename to `img-N.[extension]` / `img-N.[확장자]` 형식으로 변경
- Example: If you have img-1.png through img-10.png, next file should be img-11.png
- 예시: img-1.png부터 img-10.png까지 있다면, 다음은 img-11.png

### Step 3: Add to Folder (폴더에 추가)
- Copy renamed files to this folder: `clients/university/`
- 변경한 파일을 이 폴더에 복사: `clients/university/`

### Step 4: Verify (확인)
- Refresh website / 웹사이트 새로고침
- Navigate to "주요고객" → "대학교" tab / "주요고객" → "대학교" 탭으로 이동
- New logos should appear automatically / 새 로고가 자동으로 표시됨

---

## 🔄 How Auto-Loading Works (자동 로딩 원리)

The website automatically scans for logo files using this process:
웹사이트는 다음 방식으로 로고 파일을 자동 스캔합니다:

1. **Sequential Scan**: Checks img-1, img-2, img-3... in order / 순차 스캔: img-1, img-2, img-3... 순서대로 확인
2. **Format Check**: Tries .png → .jpg → .jpeg → .svg for each number / 형식 확인: 각 번호마다 .png → .jpg → .jpeg → .svg 시도
3. **Stop Condition**: Stops after 3 consecutive missing files / 중단 조건: 3개 연속 파일 없으면 중단

### Example Scenario (예시 시나리오):
```
✅ img-1.png  → Loaded
✅ img-2.jpg  → Loaded
✅ img-3.svg  → Loaded
❌ img-4.*    → Not found (1st miss)
❌ img-5.*    → Not found (2nd miss)
❌ img-6.*    → Not found (3rd miss)
🛑 Scanning stops / 스캔 중단
```

**Best Practice**: Keep files numbered sequentially without gaps.
**권장 사항**: 빈칸 없이 순차적으로 번호를 유지하세요.

---

## 📝 Quick Reference (빠른 참조)

| Task | Command/Action |
|------|---------------|
| Check current logos | Count files in `clients/university/` folder |
| Next file number | Last number + 1 |
| Test changes | Refresh browser (Ctrl+F5 / Cmd+Shift+R) |

| 작업 | 명령/동작 |
|------|----------|
| 현재 로고 확인 | `clients/university/` 폴더의 파일 개수 확인 |
| 다음 파일 번호 | 마지막 번호 + 1 |
| 변경사항 테스트 | 브라우저 새로고침 (Ctrl+F5 / Cmd+Shift+R) |

---

**Category**: University (대학교)
**Folder Path**: `/clients/university/`
**Displayed in**: "주요고객" Section → "대학교" Tab
