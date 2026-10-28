
const menuButton=document.querySelector('.menu-toggle');
const nav=document.querySelector('#site-nav');
menuButton?.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open));menuButton.textContent=open?'✕':'☰';});
nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menuButton?.setAttribute('aria-expanded','false');if(menuButton)menuButton.textContent='☰';}));
const list=document.getElementById('blog-list');
const status=document.getElementById('blog-status');
function makeFallback(message){
  list.replaceChildren();
  const wrapper=document.createElement('div');wrapper.className='blog-loading';
  const p=document.createElement('p');p.textContent='최신 게시글 자동 표시를 준비 중입니다. 아래에서 AG천팀장 블로그의 실제 진행 후기를 확인하실 수 있습니다.';wrapper.appendChild(p);
  const a=document.createElement('a');a.href='https://blog.naver.com/cyk2410';a.target='_blank';a.rel='noopener noreferrer';a.textContent='AG천팀장 블로그 900건 이상 실제 진행 확인하기 ↗';a.style.cssText='display:inline-block;margin:8px;padding:10px 14px;border:1px solid #d2d6dd;border-radius:6px;font-size:13px';wrapper.appendChild(a);
  list.appendChild(wrapper);status.textContent=message||'자동 수집은 Cloudflare 배포 후 확인할 수 있습니다.';
}
function renderPosts(posts){
  list.replaceChildren();
  posts.slice(0,6).forEach(post=>{
    const card=document.createElement('article');card.className='blog-card';
    const date=document.createElement('span');date.className='date';date.textContent=post.date||'최신 게시글';
    const h=document.createElement('h3');h.textContent=post.title;
    const link=document.createElement('a');link.className='read';link.textContent='게시글 읽기 ↗';link.href=post.url;link.target='_blank';link.rel='noopener noreferrer';
    card.append(date,h,link);list.appendChild(card);
  });
  status.textContent=`AG천팀장 블로그 최신 게시글 ${posts.length}개를 발행일 순으로 표시합니다.`;
}
async function loadPosts(){
  if(location.protocol==='file:'){makeFallback('컴퓨터에서 직접 연 미리보기에서는 최신 글 자동 수집이 실행되지 않습니다. Cloudflare 배포 후 확인해 주세요.');return;}
  try{
    const controller=new AbortController();const timeout=setTimeout(()=>controller.abort(),11000);
    const response=await fetch('/api/blog-feed',{signal:controller.signal,headers:{'Accept':'application/json'}});clearTimeout(timeout);
    if(!response.ok)throw new Error('HTTP '+response.status);
    const result=await response.json();
    if(!Array.isArray(result.posts)||result.posts.length===0)throw new Error('No posts');
    renderPosts(result.posts);
    if(result.warnings?.length)status.textContent+=' · 일부 블로그 RSS 접근 제한 가능';
  }catch(e){makeFallback('자동 목록을 불러오지 못했습니다. Cloudflare Pages Functions 및 네이버 RSS 접근 상태를 확인해 주세요.');}
}
loadPosts();
