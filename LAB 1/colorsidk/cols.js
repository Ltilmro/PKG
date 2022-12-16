var rgbaColor = 'rgba(255,0,0,1)';
var colorBlock = document.getElementById('color-block');
var ctx1 = colorBlock.getContext('2d');
var width1 = colorBlock.width;
var height1 = colorBlock.height;

var colorStrip = document.getElementById('color-strip');
var ctx2 = colorStrip.getContext('2d');
var width2 = colorStrip.width;
var height2 = colorStrip.height;

var colorLabel = document.getElementById('color-label');

var x = 0;
var y = 0;
var drag = false;

let aInput=document.querySelector('#a');
let aaInput=document.querySelector('#aa');
let bbInput=document.querySelector('#bb');
let bInput=document.querySelector('#b');
let cInput=document.querySelector('#c');
let ccInput=document.querySelector('#cc');
let dInput=document.querySelector('#d');
let ddInput=document.querySelector('#dd');
let eInput=document.querySelector('#e');
let eeInput=document.querySelector('#ee');
let fInput=document.querySelector('#f');
let ffInput=document.querySelector('#ff');
let gInput=document.querySelector('#g');
let ggInput=document.querySelector('#gg');
let hInput=document.querySelector('#h');
let hhInput=document.querySelector('#hh');
let iInput=document.querySelector('#i');
let iiInput=document.querySelector('#ii');
let jInput=document.querySelector('#j');
let jjInput=document.querySelector('#jj');
let kInput=document.querySelector('#k');
let kkInput=document.querySelector('#kk');
let lInput=document.querySelector('#l');
let llInput=document.querySelector('#ll');
let mInput=document.querySelector('#m');
let mmInput=document.querySelector('#mm');
let nInput=document.querySelector('#n');
let nnInput=document.querySelector('#nn');
let oInput=document.querySelector('#o');
let ooInput=document.querySelector('#oo');
let pInput=document.querySelector('#p');
let ppInput=document.querySelector('#pp');
let xInput=document.querySelector('#x');
let xxInput=document.querySelector('#xx');
let yInput=document.querySelector('#y');
let yyInput=document.querySelector('#yy');
let zInput=document.querySelector('#z');
let zzInput=document.querySelector('#zz');
function rgbToCmyk()
{
    gInput.value=1-Math.max(aInput.value/255,bInput.value/255,cInput.value/255)
    if(gInput.value==1)
    {
        dInput.value=0;
        eInput.value=0;
        fInput.value=0;
    } else{
    dInput.value=(1-(aInput.value/255)-gInput.value)/(1-gInput.value)
    eInput.value=(1-(bInput.value/255)-gInput.value)/(1-gInput.value)
    fInput.value=(1-(cInput.value/255)-gInput.value)/(1-gInput.value)
    }
    ddInput.value=100*dInput.value;
    eeInput.value=100*eInput.value;
    ffInput.value=100*fInput.value;
    ggInput.value=100*gInput.value;
}
function cmykToRgb()
{
    aInput.value=255*(1-dInput.value)*(1-gInput.value)
    bInput.value=255*(1-eInput.value)*(1-gInput.value)
    cInput.value=255*(1-fInput.value)*(1-gInput.value)
    aaInput.value=aInput.value;
    bbInput.value=bInput.value;
    ccInput.value=cInput.value;
}
function rgbToHsv()
{
    jInput.value=Math.max(aInput.value/255,bInput.value/255,cInput.value/255);
    let minn=Math.min(aInput.value/255,bInput.value/255,cInput.value/255);
    if(jInput.value==0){
        iInput.value=0;
    }else{
        iInput.value=(jInput.value-minn)/jInput.value;
    }
    if(jInput.value-minn==0){
        hInput.value=0;
    }else if(jInput.value==aInput.value/255){
        hInput.value=60*((bInput.value/255-cInput.value/255)/(jInput.value-minn))
    }else if(jInput.value==bInput.value/255){
        hInput.value=60*(2+(cInput.value/255-aInput.value/255)/(jInput.value-minn))
    }else if(jInput.value==cInput.value/255){
        hInput.value=60*(4+(aInput.value/255-bInput.value/255)/(jInput.value-minn))
    }
    hInput.value=hInput.value%360;
    if(hInput.value<0){
        hInput.value=360 + Number(hInput.value);
    }
    jjInput.value=jInput.value*100;
    iiInput.value=iInput.value*100;
    hhInput.value=hInput.value;
}
function hsvToRgb()
{
    let chr=iInput.value*jInput.value;
    let xh=chr*(1-Math.abs((hInput.value/60)%2-1))
    let mh=jInput.value-chr;
    if (hInput.value<60){
        aInput.value=(chr+mh)*255
        bInput.value=(xh+mh)*255
        cInput.value=mh*255
    }else if (hInput.value<120){
        aInput.value=(xh+mh)*255
        bInput.value=(chr+mh)*255
        cInput.value=mh*255
    }else if (hInput.value<180){
        aInput.value=mh*255
        bInput.value=(chr+mh)*255
        cInput.value=(xh+mh)*255
    }else if (hInput.value<240){
        aInput.value=mh*255
        bInput.value=(xh+mh)*255
        cInput.value=(chr+mh)*255
    }else if (hInput.value<300){
        aInput.value=(xh+mh)*255
        bInput.value=mh*255
        cInput.value=(chr+mh)*255
    }else{
        aInput.value=(chr+mh)*255
        bInput.value=mh*255
        cInput.value=(xh+mh)*255
    }
    aaInput.value=aInput.value;
    bbInput.value=bInput.value;
    ccInput.value=cInput.value;
}
function hsvToHsl()
{
kInput.value=hInput.value;
kkInput.value=hhInput.value;
mInput.value=iInput.value;
mmInput.value=iiInput.value;
lInput.value=(Math.max(aInput.value/255,bInput.value/255,cInput.value/255)+Math.min(aInput.value/255,bInput.value/255,cInput.value/255))/2;
llInput.value=lInput.value*100;
}
function hslToRgb()
{
let ch=(1-Math.abs(2*lInput.value-1))*mInput.value;
let xhh=ch*(1-Math.abs((kInput.value/60)%2-1));
let mhh=lInput.value-(ch/2);
if (kInput.value<60){
    aInput.value=(ch+mhh)*255
    bInput.value=(xhh+mhh)*255
    cInput.value=mhh*255
}else if (kInput.value<120){
    aInput.value=(xhh+mhh)*255
    bInput.value=(ch+mhh)*255
    cInput.value=mhh*255
}else if (kInput.value<180){
    aInput.value=mhh*255
    bInput.value=(ch+mhh)*255
    cInput.value=(xhh+mhh)*255
}else if (kInput.value<240){
    aInput.value=mhh*255
    bInput.value=(xhh+mhh)*255
    cInput.value=(ch+mhh)*255
}else if (kInput.value<300){
    aInput.value=(xhh+mhh)*255
    bInput.value=mhh*255
    cInput.value=(ch+mhh)*255
}else{
    aInput.value=(ch+mhh)*255
    bInput.value=mhh*255
    cInput.value=(xhh+mhh)*255
}
aaInput.value=aInput.value;
bbInput.value=bInput.value;
ccInput.value=cInput.value;
}
function hslToHsv()
{
    hInput.value=kInput.value;
    hhInput.value=kkInput.value;
    iInput.value=mInput.value;
    iiInput.value=mmInput.value;
    jInput.value=Math.max(aInput.value/255,bInput.value/255,cInput.value/255);
    jjInput.value=jInput.value*100;
}
function rgbToXyz()
{
    xInput.value=0.4124564*aInput.value/255+0.3575761*bInput.value/255+0.1804375*cInput.value/255
    yInput.value=0.2126729*aInput.value/255+0.7151522*bInput.value/255+0.0721750*cInput.value/255
    zInput.value=0.0193339*aInput.value/255+0.1191920*bInput.value/255+0.9503041*cInput.value/255
    xxInput.value=xInput.value*1000
    yyInput.value=yInput.value*1000
    zzInput.value=zInput.value*1000
    document.getElementById("err").innerHTML = "";
}
function xyzToRgb()
{
    aInput.value=255*(xInput.value*3.2404542-yInput.value*1.5371385-zInput.value*0.4985314)
    bInput.value=255*(-xInput.value*0.9692660+yInput.value*1.8760108+zInput.value*0.0415560)
    cInput.value=255*(xInput.value*0.0556434-yInput.value*0.2040259+zInput.value*1.0572252)
    if(aInput.value<0)
    {
        aInput.value=0
    }
    if(aInput.value>255)
    {
        aInput.value=255
    }
    if(bInput.value<0)
    {
        bInput.value=0
    }
    if(bInput.value>255)
    {
        bInput.value=255
    }
    if(cInput.value<0)
    {
        cInput.value=0
    }
    if(cInput.value>255)
    {
        cInput.value=255
    }
    aaInput.value=aInput.value
    bbInput.value=bInput.value
    ccInput.value=cInput.value
}
function xyzToLab()
{
    let xn=xInput.value/95.0489
    let yn=yInput.value/100
    let zn=zInput.value/108.8840
    let dd=0.00856
    let xm
    let ym
    let zm
    if(xn>dd)
    {
        xm=Math.pow(xn,1/3)
    }
    else{
        xm=(903.3*xn+16)/116
    }
    if(yn>dd)
    {
        ym=Math.pow(yn,1/3)
    }
    else{
        ym=(903.3*yn+16)/116
    }
    if(zn>dd)
    {
        zm=Math.pow(zn,1/3)
    }
    else{
        zm=(903.3*zn+16)/116
    }
    nInput.value=100*(116*ym-16)/8.991443237417908
    oInput.value=500*(xm-ym)
    pInput.value=200*(ym-zm)
    nnInput.value=nInput.value
    ooInput.value=oInput.value
    ppInput.value=pInput.value
}
function labToXyz()
{
    let n=8.991443237417908*nInput.value/100
    let o=oInput.value
    let p=pInput.value
    let dd=0.008856
    let kk=903.3
    let fy=(n+16)/116
    let fx=o/500+fy
    let fz=fy-(p/200)
    if(Math.pow(fx,3)>dd)
    {
        xInput.value=Math.pow(fx,3)*95.0489
    }else{
        xInput.value=95.0489*(116*fx-16)/kk
    }
    if(n>dd*kk)
    {
        yInput.value=Math.pow(((n+16)/116),3)*100
    }else{
        yInput.value=100*n/kk
    }
    if(Math.pow(fz,3)>dd)
    {
        zInput.value=Math.pow(fz,3)*108.8840
    }else{
        zInput.value=108.8840*(116*fz-16)/kk
    }
    xxInput.value=xInput.value*1000
    yyInput.value=yInput.value*1000
    zzInput.value=zInput.value*1000
    if(zInput.value>1||zInput.value<-1||xInput.value<-1||xInput.value>1)
    {
        document.getElementById("err").innerHTML = "CONVERSION ERROR";
    }
    else{
        document.getElementById("err").innerHTML = "";
    }
}
function fix()
{
    aInput.value=Math.round(aInput.value*1)/1;
    bInput.value=Math.round(bInput.value*1)/1;
    cInput.value=Math.round(cInput.value*1)/1;
    dInput.value=Math.round(dInput.value*10000)/10000;
    eInput.value=Math.round(eInput.value*10000)/10000;
    fInput.value=Math.round(fInput.value*10000)/10000;
    gInput.value=Math.round(gInput.value*10000)/10000;
    hInput.value=Math.round(hInput.value*100)/100;
    iInput.value=Math.round(iInput.value*10000)/10000;
    jInput.value=Math.round(jInput.value*10000)/10000;
    kInput.value=Math.round(kInput.value*100)/100;
    lInput.value=Math.round(lInput.value*10000)/10000;
    mInput.value=Math.round(mInput.value*10000)/10000;
    nInput.value=Math.round(nInput.value*10000)/10000;
    oInput.value=Math.round(oInput.value*100)/100;
    pInput.value=Math.round(pInput.value*100)/100;
    xInput.value=Math.round(xInput.value*10000)/10000;
    yInput.value=Math.round(yInput.value*10000)/10000;
    zInput.value=Math.round(zInput.value*10000)/10000;
}
function rgbaise(a,b,c)
{
    let maxx=Math.max(a/255,b/255,c/255);
    let minn=Math.min(a/255,b/255,c/255);
    let del=maxx-minn;
    let hh=0;
    if(del==0){
        hh=0;
    }else if(maxx==a/255){
        hh=60*((b/255-c/255)/del)
    }else if(maxx==b/255){
        hh=60*(2+(c/255-a/255)/del)
    }else if(maxx==c/255){
        hh=60*(4+(a/255-b/255)/del)
    }
    hh=hh%360;
    if(hh<0){
        hh=360 + Number(hh);
    }
    let aa=0;
    let bb=0;
    let cc=0;
    let xh=(1-Math.abs((hh/60)%2-1))
    if (hh<60){
        aa=255
        bb=xh*255
        cc=0
    }else if (hh<120){
        aa=xh*255
        bb=255
        cc=0
    }else if (hh<180){
        aa=0
        bb=255
        cc=xh*255
    }else if (hh<240){
        aa=0
        bb=xh*255
        cc=255
    }else if (hh<300){
        aa=xh*255
        bb=0
        cc=255
    }else{
        aa=255
        bb=0
        cc=xh*255
    }
    rgbaColor = 'rgba(' + aa + ',' + bb + ',' + cc + ',1)'
}
function doColor()
{
    fix();
    let acolr=aInput.value;
    let bcolr=bInput.value;
    let ccolr=cInput.value;
    rgbaise(acolr,bcolr,ccolr)
    fillGradient();
    let clr="rgb("+acolr+","+bcolr+","+ccolr+")";
    document.body.style.backgroundColor=clr;
}
function doColorNoRedraw()
{
    fix();
    let acolr=aInput.value;
    let bcolr=bInput.value;
    let ccolr=cInput.value;
    let clr="rgb("+acolr+","+bcolr+","+ccolr+")";
    document.body.style.backgroundColor=clr;
}
function doRgb()
{
    rgbToCmyk();
    rgbToHsv();
    hsvToHsl();
    rgbToXyz();
    xyzToLab();
    doColor();
}
function doRgbNoRedraw()
{
    rgbToCmyk();
    rgbToHsv();
    hsvToHsl();
    rgbToXyz();
    xyzToLab();
    doColorNoRedraw();
}
function doCmyk()
{
    cmykToRgb();
    rgbToHsv();
    hsvToHsl();
    rgbToXyz();
    xyzToLab();
    doColor();
}
function doHsv()
{
    hsvToRgb();
    rgbToCmyk();
    hsvToHsl();
    rgbToXyz();
    xyzToLab();
    doColor();
}
function doHsl()
{
    hslToRgb();
    hslToHsv();
    rgbToCmyk();
    rgbToXyz();
    xyzToLab();
    doColor();
}
function doLab()
{
    labToXyz();
    xyzToRgb();
    rgbToCmyk();
    rgbToHsv();
    hsvToHsl();
    doColor();
}
function doXyz()
{
    xyzToRgb();
    xyzToLab();
    rgbToCmyk();
    rgbToHsv();
    hsvToHsl();
    doColor();
}
function assRgb(a,b,c)
{
    aInput.value=a;
    aaInput.value=aInput.value;
    bInput.value=b;
    bbInput.value=bInput.value;
    cInput.value=c;
    ccInput.value=cInput.value;
    doRgbNoRedraw();
}
function assHue(a,b,c)
{
    let maxx=Math.max(a/255,b/255,c/255);
    let minn=Math.min(a/255,b/255,c/255);
    let del=maxx-minn;
    if(maxx-minn==0){
        hInput.value=0;
    }else if(maxx==a/255){
        hInput.value=60*((b/255-c/255)/del)
    }else if(maxx==b/255){
        hInput.value=60*(2+(c/255-a/255)/del)
    }else if(maxx==c/255){
        hInput.value=60*(4+(a/255-b/255)/del)
    }
    hInput.value=hInput.value%360;
    if(hInput.value<0){
        hInput.value=360 + Number(hInput.value);
    }
    hhInput.value=hInput.value;
    doHsv();
}
function limitEvent(min,max,ev)
{
    if(ev.value<min)
    {
        ev.value=min;
    }
    if(ev.value>max)
    {
        ev.value=max;
    }
}
aInput.addEventListener('input',()=>{
    limitEvent(0,255,aInput);
    aaInput.value=aInput.value;
    doRgb();
})
aaInput.addEventListener('input',()=>{
    aInput.value=aaInput.value;
    doRgb();
})
bInput.addEventListener('input',()=>{
    limitEvent(0,255,bInput);
    bbInput.value=bInput.value;
    doRgb();
})
bbInput.addEventListener('input',()=>{
    bInput.value=bbInput.value
    doRgb();
})
cInput.addEventListener('input',()=>{
    limitEvent(0,255,cInput);
    ccInput.value=cInput.value
    doRgb();
})
ccInput.addEventListener('input',()=>{
    cInput.value=ccInput.value
    doRgb();
})
dInput.addEventListener('input',()=>{
    limitEvent(0,1,dInput);
    ddInput.value=dInput.value*100
    doCmyk();
})
ddInput.addEventListener('input',()=>{
    dInput.value=ddInput.value/100
    doCmyk();
})
eInput.addEventListener('input',()=>{
    limitEvent(0,1,eInput);
    eeInput.value=eInput.value*100
    doCmyk();
})
eeInput.addEventListener('input',()=>{
    eInput.value=eeInput.value/100
    doCmyk();
})
fInput.addEventListener('input',()=>{
    limitEvent(0,1,fInput);
    ffInput.value=fInput.value*100
    doCmyk();
})
ffInput.addEventListener('input',()=>{
    fInput.value=ffInput.value/100
    doCmyk();
})
gInput.addEventListener('input',()=>{
    limitEvent(0,1,gInput);
    ggInput.value=gInput.value*100
    doCmyk();
})
ggInput.addEventListener('input',()=>{
    gInput.value=ggInput.value/100
    doCmyk();
})
hInput.addEventListener('input',()=>{
    limitEvent(0,360,hInput);
    hhInput.value=hInput.value;
    doHsv();
})
hhInput.addEventListener('input',()=>{
    hInput.value=hhInput.value;
    doHsv();
})
iInput.addEventListener('input',()=>{
    limitEvent(0,1,iInput);
    iiInput.value=iInput.value*100;
    doHsv();
})
iiInput.addEventListener('input',()=>{
    iInput.value=iiInput.value/100;
    doHsv();
})
jInput.addEventListener('input',()=>{
    limitEvent(0,1,jInput);
    jjInput.value=jInput.value*100;
    doHsv();
})
jjInput.addEventListener('input',()=>{
    jInput.value=jjInput.value/100;
    doHsv();
})
kInput.addEventListener('input',()=>{
    limitEvent(0,360,kInput);
    kkInput.value=kInput.value;
    doHsl();
})
kkInput.addEventListener('input',()=>{
    kInput.value=kkInput.value;
    doHsl();
})
mInput.addEventListener('input',()=>{
    limitEvent(0,1,mInput);
    mmInput.value=mInput.value*100;
    doHsl();
})
mmInput.addEventListener('input',()=>{
    mInput.value=mmInput.value/100;
    doHsl();
})
lInput.addEventListener('input',()=>{
    limitEvent(0,1,lInput);
    llInput.value=lInput.value*100;
    doHsl();
})
llInput.addEventListener('input',()=>{
    lInput.value=llInput.value/100;
    doHsl();
})
nInput.addEventListener('input',()=>{
    limitEvent(0,100,nInput);
    nnInput.value=nInput.value;
    doLab();
})
nnInput.addEventListener('input',()=>{
    nInput.value=nnInput.value;
    doLab();
})
oInput.addEventListener('input',()=>{
    limitEvent(-80,80,oInput);
    ooInput.value=oInput.value;
    doLab();
})
ooInput.addEventListener('input',()=>{
    oInput.value=ooInput.value;
    doLab();
})
pInput.addEventListener('input',()=>{
    limitEvent(-80,80,pInput);
    ppInput.value=pInput.value;
    doLab();
})
ppInput.addEventListener('input',()=>{
    pInput.value=ppInput.value;
    doLab();
})
xInput.addEventListener('input',()=>{
    limitEvent(0,1,xInput);
    xxInput.value=xInput.value*1000;
    doXyz();
})
xxInput.addEventListener('input',()=>{
    xInput.value=xxInput.value/1000;
    doXyz();
})
yInput.addEventListener('input',()=>{
    limitEvent(0,1,yInput);
    yyInput.value=yInput.value*1000;
    doXyz();
})
yyInput.addEventListener('input',()=>{
    yInput.value=yyInput.value/1000;
    doXyz();
})
zInput.addEventListener('input',()=>{
    limitEvent(0,1,zInput);
    zzInput.value=zInput.value*1000;
    doXyz();
})
zzInput.addEventListener('input',()=>{
    zInput.value=zzInput.value/1000;
    doXyz();
})
//var canvas=document.getElementById('#can');
//var x=canvas.canvas.width;
//x=canvas.canvas.height;
ctx1.rect(0, 0, width1, height1);
fillGradient();

ctx2.rect(0, 0, width2, height2);
var grd1 = ctx2.createLinearGradient(0, 0, 0, height1);
grd1.addColorStop(0, 'rgba(255, 0, 0, 1)');
grd1.addColorStop(0.17, 'rgba(255, 255, 0, 1)');
grd1.addColorStop(0.34, 'rgba(0, 255, 0, 1)');
grd1.addColorStop(0.51, 'rgba(0, 255, 255, 1)');
grd1.addColorStop(0.68, 'rgba(0, 0, 255, 1)');
grd1.addColorStop(0.85, 'rgba(255, 0, 255, 1)');
grd1.addColorStop(1, 'rgba(255, 0, 0, 1)');
ctx2.fillStyle = grd1;
ctx2.fill();

function click(e) {
  x = e.offsetX;
  y = e.offsetY;
  var imageData = ctx2.getImageData(x, y, 1, 1).data;
  rgbaColor = 'rgba(' + imageData[0] + ',' + imageData[1] + ',' + imageData[2] + ',1)';
  assHue(imageData[0],imageData[1],imageData[2]);
 //document.body.style.backgroundColor = rgbaColor;
  fillGradient();
}

function fillGradient() {
  ctx1.fillStyle = rgbaColor;
  ctx1.fillRect(0, 0, width1, height1);

  var grdWhite = ctx2.createLinearGradient(0, 0, width1, 0);
  grdWhite.addColorStop(0, 'rgba(255,255,255,1)');
  grdWhite.addColorStop(1, 'rgba(255,255,255,0)');
  ctx1.fillStyle = grdWhite;
  ctx1.fillRect(0, 0, width1, height1);

  var grdBlack = ctx2.createLinearGradient(0, 0, 0, height1);
  grdBlack.addColorStop(0, 'rgba(0,0,0,0)');
  grdBlack.addColorStop(1, 'rgba(0,0,0,1)');
  ctx1.fillStyle = grdBlack;
  ctx1.fillRect(0, 0, width1, height1);
}

function mousedown(e) {
  drag = true;
  changeColor(e);
}

function mousemove(e) {
  if (drag) {
    changeColor(e);
  }
}

function mouseup(e) {
  drag = false;
}

function changeColor(e) {
  x = e.offsetX;
  y = e.offsetY;
  var imageData = ctx1.getImageData(x, y, 1, 1).data;
  rgbaColor = 'rgba(' + imageData[0] + ',' + imageData[1] + ',' + imageData[2] + ',1)';
  assRgb(imageData[0],imageData[1],imageData[2]);
  //document.body.style.backgroundColor = rgbaColor;
}
function mousedoown(e) {
    drag = true;
    click(e);
  }
  
  function mousemoove(e) {
    if (drag) {
      click(e);
    }
  }
  
  function mouseuup(e) {
    drag = false;
  }
colorStrip.addEventListener("click", click, false);
colorStrip.addEventListener("mousedown", mousedoown, false);
colorStrip.addEventListener("mouseup", mouseuup, false);
colorStrip.addEventListener("mousemove", mousemoove, false);

colorBlock.addEventListener("mousedown", mousedown, false);
colorBlock.addEventListener("mouseup", mouseup, false);
colorBlock.addEventListener("mousemove", mousemove, false);