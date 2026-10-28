
const BLOG_IDS=['cyk2410','sjykmk1031'];
const MAX_ITEMS=12;
const decode=(s='')=>s.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g,'$1').replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&#(\d+);/g,(_,n)=>String.fromCodePoint(Number(n))).replace(/<[^>]*>/g,'').trim();
const tag=(xml,name)=>{const m=xml.match(new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${name}>`,'i'));return m?decode(m[1]):'';};
function parse(xml,id){
  const items=xml.match(/<item(?:\s[^>]*)?>[\s\S]*?<\/item>/gi)||[];
  return items.slice(0,MAX_ITEMS).map(item=>{
    const title=tag(item,'title');const link=tag(item,'link');const pubDate=tag(item,'pubDate');
    const dt=new Date(pubDate);const valid=Number.isFinite(dt.getTime());
    return {title:title.slice(0,150),url:link,date:valid?new Intl.DateTimeFormat('ko-KR',{year:'numeric',month:'2-digit',day:'2-digit',timeZone:'Asia/Seoul'}).format(dt):'',timestamp:valid?dt.getTime():0,source:id};
  }).filter(p=>p.title&&/^https:\/\/(blog\.naver\.com|m\.blog\.naver\.com|blog\.naver\.com\/)/.test(p.url));
}
export async function onRequestGet(context){
  const warnings=[];
  const results=await Promise.all(BLOG_IDS.map(async id=>{
    const controller=new AbortController();const timer=setTimeout(()=>controller.abort(),8500);
    try{
      const response=await fetch(`https://rss.blog.naver.com/${id}.xml`,{signal:controller.signal,headers:{'User-Agent':'Mozilla/5.0 (compatible; AGFinanceBlogFeed/1.0)','Accept':'application/rss+xml, application/xml, text/xml'}});
      if(!response.ok)throw new Error(`RSS HTTP ${response.status}`);
      const xml=await response.text();
      if(!xml.includes('<rss')&&!xml.includes('<item'))throw new Error('RSS 형식 확인 필요');
      return parse(xml,id);
    }catch(error){warnings.push(`${id}: ${error.message}`);return [];}
    finally{clearTimeout(timer);}
  }));
  const seen=new Set();
  const posts=results.flat().sort((a,b)=>b.timestamp-a.timestamp).filter(p=>{if(seen.has(p.url))return false;seen.add(p.url);return true;}).slice(0,6);
  return new Response(JSON.stringify({posts,warnings,updatedAt:new Date().toISOString()}), {status:200,headers:{'Content-Type':'application/json; charset=utf-8','Cache-Control':'public, max-age=300, s-maxage=900','Access-Control-Allow-Origin':'*'}});
}
