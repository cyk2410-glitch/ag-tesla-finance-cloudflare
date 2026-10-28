AG 천팀장 테슬라 홈페이지 2번 — Cloudflare Pages 배포 패키지

1. GitHub 저장소: https://github.com/cyk2410-glitch/ag-tesla-finance-cloudflare
2. ZIP을 압축 해제한 후 이 폴더의 내용물(index.html, assets/, functions/ 등)을 새 저장소 최상위에 업로드합니다. 기존 ag-tesla-finance 저장소는 수정하지 않습니다.
3. Cloudflare Workers & Pages > Create > Pages > Connect to Git 에서 새 저장소를 선택합니다.
4. 프로젝트 이름: ag-tesla-finance-cloudflare (가능할 경우)
5. Framework preset: None; Build command: 빈칸; Build output directory: / 또는 . (저장소 루트)
6. 배포 후 https://ag-tesla-finance-cloudflare.pages.dev/ 접속 확인 및 /api/blog-feed 테스트. 네이버 RSS는 접근 제한으로 실패할 수 있습니다.
7. 중요: Cloudflare에서 발급된 실제 주소가 다르면 index.html의 canonical, og:url, og:image, JSON-LD URL 및 robots.txt/sitemap.xml의 주소를 실제 주소로 교체 후 배포하세요.
8. 네이버 서치어드바이저: 새 사이트 소유권 확인 후 사이트맵 등록 및 URL 수집 요청. 기존 Netlify 소유권 확인 HTML 파일을 신규 사이트에 복사하지 않았습니다. 새 사이트의 인증 파일을 별도로 발급받아야 합니다.
9. 네이버 검색 결과 아이콘 노출은 검색엔진이 결정합니다. AG 인물 favicon(.ico, 32, 192, 512) 및 OG 이미지를 배치했으나 노출 보장은 없습니다.
10. 기존 Netlify 홈페이지는 유지됩니다. 검색 중복을 피하기 위해 별도 페이지의 고유 상담·모델 정보가 추가되었지만 검색엔진 판단은 보장되지 않습니다.

수정사항: 로컬 미리보기 AG 아이콘 상대경로 적용, 윤길/수정 이름 제거, 통합 후기 버튼 문구 변경. 블로그 최신 6개는 실제 Cloudflare Pages 배포 후 /api/blog-feed 응답 확인 필요. RSS 차단 시 표시를 보장할 수 없음.
