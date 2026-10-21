// So bộ chấm điền khuyết bản cũ và bản mới (js/quiz.js) trên mọi câu điền khuyết của đề có sẵn (data/banks/)
// và một nhóm câu chữ kiểu quản trị viên nhập, với nhiều cách gõ.
// Chạy: node tests/so-bo-cham.js [bản cũ, mặc định 74b7645: bộ chấm sau L32, Phiên 9i] → in 0 chỗ khác, hai dòng cuối là 0.
// Sửa bộ chấm câu điền thì so với bản mặc định, ghi các chỗ khác vào Pull Request, rồi đổi bản mặc định sang commit của phiên đó.
// Bản sao nông (git clone --depth) có thể thiếu commit đó: chạy git fetch --unshallow trước.
const fs=require('fs'),vm=require('vm'),cp=require('child_process'),R=__dirname+'/../';
function load(src){const w={};vm.runInNewContext(src,{window:w});return w.Quiz.isRight}
const oldR=load(cp.execSync('git show '+(process.argv[2]||'74b7645')+':js/quiz.js',{cwd:R}).toString()),newR=load(fs.readFileSync(R+'js/quiz.js','utf8'));
let qs=[];require('./nap-de.js').napDe().filter(b=>!b.pool).forEach(b=>b.questions.forEach((q,i)=>q.type==='fill'&&qs.push({id:b.id+'#'+i,q}))); // đề ngẫu nhiên chỉ gộp câu của đề cố định
// câu chữ kiểu quản trị viên nhập (Quiz.parse) — không được chấm đúng nhầm
const admin=[
 {q:'Bạn ngủ đủ ___ tiếng mỗi ngày.',ans:['tám','8']},{q:'Thủ đô nước ta là ___ .',ans:['Hà Nội']},
 {q:'Nước đá là nước ở thể ___ rắn',ans:['thể']},{q:'Con vật kêu meo meo là con ___ nhà',ans:['mèo']},
 {q:'Từ trái nghĩa với "cao" là ___',ans:['thấp']},{q:'(−3) · 4 = ___',ans:['-12']},{q:'___ kg là khối lượng con heo',ans:['80']},
 {q:'Một năm có ___ tháng',ans:['mười hai','12']},{q:'Sông ___ chảy qua Hà Nội',ans:['Hồng']},{q:'Âm ___ không',ans:['-']},{q:'Góc bẹt bằng ___°',ans:['180']},{q:'Diện tích là ___ m²',ans:['5']},{q:'Lũy thừa: 4 = 2___',ans:['²']},{q:'1 250 g = ___ kg',ans:['1,25']},
 {q:'Viết phân số tối giản: 1/2 + 1/4 = ___',ans:['3/4']}];
admin.forEach((q,i)=>qs.push({id:'admin#'+i,q:Object.assign({type:'fill'},q)}));
const unit=q=>((q.q.split('___')[1]||'').trim().split(/\s+/)[0]||'').replace(/[.,;:!?]+$/,'');
const others=[...new Set(qs.flatMap(x=>x.q.ans))];
let n=0,diff=[],newWrongAccept=[];
for(const {id,q} of qs){const u=unit(q),G=new Set();
 for(const a of q.ans){[a,a.replace(',','.'),a+'.',a+' ',' '+a,a.toUpperCase(),a.replace(/\s/g,''),'('+a+')','( '+a+' ).','('+a,a+')',a+' '+u,a+u,a+'  '+u+'.','('+a+') '+u,u+' '+a,a+' '+u+' '+u,a+' '+u.normalize('NFD').replace(/\p{M}/gu,'').replace(/đ/g,'d'),a+u.replace('²','2'),a+' '+u.replace('²','2'),a+' '+u.replace('²',''),a.slice(0,-1),a+'x','x'+a,a+' '+a,a.replace('/',' / '),a.replace('/','/ '),a.replace('/',' /')].forEach(g=>G.add(g));
  if(/^[-−]?\d/.test(a)){const v=parseFloat(a.replace(/[\s.]/g,'').replace(',','.').replace('−','-'));[v+1,v-1,-v,v*10,v/10].forEach(z=>{const s=String(z);G.add(s);G.add('('+s+')');G.add(s+' '+u);G.add('('+s+') '+u)})}}
 ['', ' ', '()', '(', ')', u, '('+u+')', 'abc', 'không biết', '???', '0', '(0)', '-', '( )', u+' '+u].forEach(g=>G.add(g));
 for(let k=0;k<6;k++)G.add(others[(id.length*7+k*13)%others.length]);
 for(const g of G){n++;const o=oldR(q,g),m=newR(q,g);if(o!==m){diff.push(`${id} | "${g}" | cũ ${o} → mới ${m} | ans ${JSON.stringify(q.ans)} | q: ${q.q}`);if(m&&!o)newWrongAccept.push(g)}}}
console.log('Số câu điền khuyết:',qs.length,'(trong đó',admin.length,'câu chữ kiểu quản trị viên nhập) · số cách gõ đã so:',n);
console.log('Khác nhau:',diff.length);if(process.env.CHI_TIET)diff.forEach(d=>console.log('  '+d));
const lost=diff.filter(d=>/cũ true → mới false/.test(d));console.log('Cũ đúng → mới sai:',lost.length);
// Mọi trường hợp cũ sai → mới đúng phải là: bỏ ngoặc hoặc bỏ từ in sau ___, hoặc đổi dấu chấm thập phân thành dấu phẩy (L31),
// hoặc bỏ khoảng trắng quanh "/" (L32), thì cũ đã chấm đúng.
const strip=g=>{let s=g.trim().replace(/[.!?;:]+$/,'').trim();const m=/^\(\s*(.+?)\s*\)(.*)$/.exec(s);if(m)s=(m[1]+m[2]).trim();return s};
let bad=0;for(const {id,q} of qs){const u=unit(q).toLowerCase();for(const d of diff.filter(d=>d.startsWith(id+' |'))){const g=d.split(' | ')[1].slice(1,-1);let s=strip(g);const F=x=>x.normalize('NFD').replace(/\p{M}/gu,'').replace(/đ/g,'d').toLowerCase().replace(/2/g,'²');for(let k=1;u&&k<=s.length;k++)if(F(s.slice(-k))===F(u)){s=s.slice(0,-k).trim();break}s=strip(s);if(!oldR(q,s)&&!oldR(q,s.replace(/^(-?\d+)\.(\d+)$/,'$1,$2'))&&!oldR(q,s.replace(/\s*\/\s*/g,'/'))){bad++;console.log('NGHI:',d)}}}
console.log('Chấm đúng nhầm (sau khi bỏ ngoặc/đơn vị mà bản cũ vẫn chấm sai):',bad);
if(bad||lost.length)process.exitCode=1;
