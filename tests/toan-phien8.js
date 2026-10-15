// Tính lại đáp án các câu Toán mới/sửa ở Phiên 8 (data/banks.js). Chạy: node tests/toan-phien8.js → in MATH OK.
const a=require('assert');const r=(n,p)=>Math.round(n/p)*p;const g=(x,y)=>y?g(y,x%y):x;
// cộng, trừ có nhớ: không quá 3 lượt, không liên tiếp
const nho=(x,y,tru)=>{const A=String(x).split('').reverse().map(Number),B=String(y).split('').reverse().map(Number);let c=0;const r=[];A.forEach((d,i)=>{const v=tru?d-(B[i]||0)-c:d+(B[i]||0)+c;c=tru?+(v<0):+(v>=10);if(c)r.push(i)});return r};
const ok=(r)=>r.length<=3&&r.every((v,k)=>!k||v-r[k-1]>1);
a.equal(364857+271316,636173);a.deepEqual(nho(364857,271316),[0,2,4]);a.ok(ok(nho(364857,271316)));
// mỗi nhiễu = kết quả khi quên một lượt nhớ
const quen=(x,y,bo)=>{const A=String(x).split('').reverse().map(Number),B=String(y).split('').reverse().map(Number);let c=0;const d=[];A.forEach((v,i)=>{const s=v+B[i]+c;d.push(s%10);c=+(s>=10&&i!==bo)});return +d.reverse().join('')};
a.deepEqual([2,0,4].map(i=>quen(364857,271316,i)),[635173,636163,536173]);
a.equal(724563-351238,373325);a.equal(373325+351238,724563);a.deepEqual(nho(724563,351238,1),[0,4]);a.ok(ok(nho(724563,351238,1)));
a.equal(-48/-6,8);
a.equal(3765+2489,2489+3765);
a.deepEqual([(90+2)/2,(90-2)/2],[46,44]); a.ok(46%2===0&&44%2===0&&46+44===90);
a.deepEqual([5960000,5940000,6150000,5499000].map(n=>r(n,100000)),[6000000,5900000,6200000,5500000]);
const kg=[4500,440*10,4050,4005];a.equal(Math.max(...kg),kg[0]);a.equal(new Set(kg).size,4);
a.equal(65-58,7);
a.deepEqual([...Array(9).keys()].map(i=>i-4).filter(x=>-3<x&&x<2),[-2,-1,0,1]);
a.equal(g(30,45),15);a.equal(48/8,6);a.ok((-2)*(-3)>0);
const ds=n=>[...String(n)].reduce((s,c)=>s+ +c,0);
const chia3=[4512,5391,2304,1235].filter(n=>n%3===0&&n%9!==0);a.deepEqual(chia3,[4512]);
a.deepEqual([4512,5391,2304,1235].map(ds),[12,18,9,11]);
// lục giác: 3 đường chéo chính (nối đỉnh đối diện), tổng số đường chéo 6·3/2 = 9
a.equal(6/2,3);a.equal(6*3/2,9);
console.log('MATH OK');
