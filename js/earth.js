/* ================= Earth: three.js globe that morphs into a flat map ================= */
const Earth=(()=>{
 const DEG=Math.PI/180, FOV=35, TANV=Math.tan(FOV/2*DEG), KM=6371;
 const U={morph:{value:0}};
 let ok=null,R,scene,cam,group,earthMat,earthMesh,cloudMesh,cloudMat,atmo,stars,borders,ovMesh,octx,otex,OW=2048,OH=1024,oproj,light,amb;
 let selLine,hoverLine,feats=[],byN={},nToC={},ready=null,canvas,host=null,ro=null,raf=0,W=1,H=1,last=0;
 const st={view:'globe',t:0,tt:0,lon0:12*DEG,lat0:25*DEG,dist:3.1,cx:0,cy:.35,h:3,vx:0,vy:0};
 let tween=null, markers=[], arc=null, O={}, hoverOn=false, bordersOn=true, cloudsOn=false;
 const cb={tap:null,view:null};
 const ease=x=>x<.5?4*x*x*x:1-Math.pow(-2*x+2,3)/2;
 const lerp=(a,b,t)=>a+(b-a)*t;
 const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
 const wrapA=a=>{if(!isFinite(a))return 0;return ((a+Math.PI)%(2*Math.PI)+2*Math.PI)%(2*Math.PI)-Math.PI};

 function supported(){if(ok!==null)return ok;try{const c=document.createElement('canvas');ok=!!(window.WebGLRenderingContext&&(c.getContext('webgl2')||c.getContext('webgl')))&&!!window.THREE}catch(e){ok=false}return ok}

 const HEAD='uniform float uMorph;uniform float uR;uniform float uZ;\nvec3 gSph(vec2 p){return vec3(cos(p.y)*sin(p.x),sin(p.y),cos(p.y)*cos(p.x));}\n';
 function morphify(mat,r,z,normal){
  mat.onBeforeCompile=sh=>{sh.uniforms.uMorph=U.morph;sh.uniforms.uR={value:r};sh.uniforms.uZ={value:z};
   let v=HEAD+sh.vertexShader;
   if(normal)v=v.replace('#include <beginnormal_vertex>','vec3 objectNormal=normalize(mix(gSph(position.xy),vec3(0.,0.,1.),uMorph));');
   v=v.replace('#include <begin_vertex>','vec3 transformed=mix(gSph(position.xy)*uR,vec3(position.xy,uZ),uMorph);');
   sh.vertexShader=v};
  mat.customProgramCacheKey=()=>'m'+(normal?1:0)+'_'+r+'_'+z;return mat}
 const sph=(lon,lat,r=1)=>new THREE.Vector3(Math.cos(lat)*Math.sin(lon)*r,Math.sin(lat)*r,Math.cos(lat)*Math.cos(lon)*r);
 function localPos(lon,lat,r,z,e){const s=sph(lon,lat,r);return s.lerp(new THREE.Vector3(lon,lat,z),e)}
 function localNormal(lon,lat,e){return sph(lon,lat).lerp(new THREE.Vector3(0,0,1),e).normalize()}

 function segsFrom(lines){const a=[];for(const L of lines)for(let i=1;i<L.length;i++){const p=L[i-1],q=L[i];if(Math.abs(p[0]-q[0])>180)continue;a.push(p[0]*DEG,p[1]*DEG,0,q[0]*DEG,q[1]*DEG,0)}return new Float32Array(a)}
 function ringsOf(f){const g=f.geometry;if(!g)return[];return g.type==='Polygon'?g.coordinates:g.type==='MultiPolygon'?g.coordinates.flat():[]}
 function lineObj(color,r,z,opacity){const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.BufferAttribute(new Float32Array(6),3));
  const m=morphify(new THREE.LineBasicMaterial({color,transparent:true,opacity,depthWrite:false}),r,z,false);const l=new THREE.LineSegments(geo,m);l.renderOrder=3;l.frustumCulled=false;return l}
 function setLine(l,f){const arr=f?segsFrom(ringsOf(f)):new Float32Array(6);l.geometry.setAttribute('position',new THREE.BufferAttribute(arr,3));l.geometry.computeBoundingSphere();l.visible=!!f}

 function init(){
  if(ready)return ready;
  ready=new Promise((res,rej)=>{
   if(!supported()){rej(new Error('webgl'));return}
   UP=new THREE.Vector3(0,1,0);qI=new THREE.Quaternion();qG=new THREE.Quaternion();eul=new THREE.Euler();
   R=new THREE.WebGLRenderer({antialias:true,alpha:false,powerPreference:'high-performance'});
   R.setPixelRatio(Math.min(window.devicePixelRatio||1,2));R.outputEncoding=THREE.sRGBEncoding;R.setClearColor(0x03060c,1);
   canvas=R.domElement;canvas.className='earthcanvas';canvas.setAttribute('aria-label','Globe');
   scene=new THREE.Scene();cam=new THREE.PerspectiveCamera(FOV,1,.01,200);
   group=new THREE.Group();scene.add(group);
   amb=new THREE.AmbientLight(0xffffff,.32);scene.add(amb);
   light=new THREE.DirectionalLight(0xffffff,1.05);scene.add(light);scene.add(light.target);
   const geo=new THREE.PlaneGeometry(2*Math.PI,Math.PI,256,128);
   earthMat=morphify(new THREE.MeshPhongMaterial({color:0xffffff,specular:new THREE.Color(0x2a4a70),shininess:22,bumpScale:.018}),1,0,true);
   earthMesh=new THREE.Mesh(geo,earthMat);earthMesh.frustumCulled=false;group.add(earthMesh);
   // overlay (country fills)
   const coarse=matchMedia('(pointer:coarse)').matches;OW=coarse?2048:4096;OH=OW/2;
   const oc=document.createElement('canvas');oc.width=OW;oc.height=OH;octx=oc.getContext('2d');
   otex=new THREE.CanvasTexture(oc);otex.encoding=THREE.sRGBEncoding;otex.anisotropy=R.capabilities.getMaxAnisotropy();
   oproj=d3.geoEquirectangular().scale(OW/(2*Math.PI)).translate([OW/2,OH/2]).precision(.2);
   ovMesh=new THREE.Mesh(geo,morphify(new THREE.MeshBasicMaterial({map:otex,transparent:true,depthWrite:false}),1.0015,.001,false));ovMesh.renderOrder=2;ovMesh.frustumCulled=false;group.add(ovMesh);
   // clouds
   cloudMat=morphify(new THREE.MeshPhongMaterial({color:0xffffff,transparent:true,depthWrite:false,opacity:.85}),1.012,.006,true);
   cloudMesh=new THREE.Mesh(geo,cloudMat);cloudMesh.renderOrder=5;cloudMesh.visible=false;cloudMesh.frustumCulled=false;group.add(cloudMesh);
   // atmosphere
   atmo=new THREE.Mesh(new THREE.SphereGeometry(1.11,64,48),new THREE.ShaderMaterial({uniforms:{op:{value:1}},
    vertexShader:'varying vec3 vN;void main(){vN=normalize(normalMatrix*normal);gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',
    fragmentShader:'uniform float op;varying vec3 vN;void main(){float i=pow(max(0.,.72-dot(vN,vec3(0.,0.,1.))),2.6);gl_FragColor=vec4(.35,.62,1.,1.)*i*1.15*op;}',
    side:THREE.BackSide,blending:THREE.AdditiveBlending,transparent:true,depthWrite:false}));scene.add(atmo);
   // stars
   const sp=[];for(let i=0;i<1600;i++){const v=new THREE.Vector3().randomDirection().multiplyScalar(60+Math.random()*30);sp.push(v.x,v.y,v.z)}
   const sg=new THREE.BufferGeometry();sg.setAttribute('position',new THREE.Float32BufferAttribute(sp,3));
   stars=new THREE.Points(sg,new THREE.PointsMaterial({color:0xcfe0ff,size:1.4,sizeAttenuation:false,transparent:true,opacity:.75,depthWrite:false}));scene.add(stars);
   selLine=lineObj(0xffffff,1.0035,.004,1);hoverLine=lineObj(0xffffff,1.003,.0035,.55);group.add(selLine);group.add(hoverLine);
   const L=new THREE.TextureLoader();
   const tex=(u,srgb)=>new Promise(r=>L.load(u,t=>{if(srgb)t.encoding=THREE.sRGBEncoding;t.anisotropy=R.capabilities.getMaxAnisotropy();r(t)},undefined,()=>r(null)));
   Promise.all([fetch('world.json').then(r=>r.json()),tex('tex/earth-2k.jpg',true),tex('tex/bump.jpg'),tex('tex/ocean.jpg')]).then(([topo,alb,bump,ocean])=>{
    earthMat.map=alb;earthMat.bumpMap=bump;earthMat.specularMap=ocean;earthMat.needsUpdate=true;
    const obj=topo.objects.countries;
    feats=topojson.feature(topo,obj).features.filter(f=>f.id).map(f=>{const c=d3.geoCentroid(f);let rad=0;for(const r of ringsOf(f))for(const p of r){const d=d3.geoDistance(c,p);if(d>rad)rad=d}
     return{f,id:f.id,c,rad,area:d3.geoArea(f)*KM*KM}});
    feats.forEach(x=>(byN[x.id]=byN[x.id]||[]).push(x));
    COUNTRIES.forEach(c=>nToC[c.n]=c);
    const bg=new THREE.BufferGeometry();bg.setAttribute('position',new THREE.BufferAttribute(segsFrom(topojson.mesh(topo,obj,(a,b)=>a!==b).coordinates),3));
    borders=new THREE.LineSegments(bg,morphify(new THREE.LineBasicMaterial({color:0xffffff,transparent:true,opacity:.42,depthWrite:false}),1.002,.002,false));borders.renderOrder=3;borders.frustumCulled=false;group.add(borders);
    borders.visible=bordersOn;
    res();
    // sharper texture for larger screens
    if(R.capabilities.maxTextureSize>=4096)tex('tex/earth-4k.jpg',true).then(t=>{if(t){earthMat.map=t;earthMat.needsUpdate=true}});
   }).catch(rej);
   bindInput();
  });
  return ready}

 function loadClouds(){if(cloudMat.alphaMap)return;new THREE.TextureLoader().load('tex/clouds.jpg',t=>{cloudMat.alphaMap=t;cloudMat.needsUpdate=true})}

 /* ---------- camera ---------- */
 function hMax(){const a=W/H;return Math.max(Math.PI/(TANV*a),1.32/TANV)*1.02}
 function clampMap(){st.h=clamp(st.h,.05,hMax());const vh=st.h*TANV,vw=vh*W/H;
  st.cx=vw>=Math.PI?0:clamp(st.cx,-Math.PI+vw,Math.PI-vw);
  const top=1.48,bot=-1.08;st.cy=vh*2>=top-bot?(top+bot)/2:clamp(st.cy,bot+vh,top-vh)}
 function fullDist(){const eff=TANV*Math.min(1,W/H);return 1.06/Math.sin(Math.atan(eff))}
 function clampGlobe(){st.lat0=clamp(st.lat0,-80*DEG,80*DEG);st.lon0=wrapA(st.lon0);st.dist=clamp(st.dist,1.1,Math.max(4.4,fullDist()+.4))}
 function worldPerPx(){const e=ease(st.t);return lerp(st.dist-1,st.h,e)*2*TANV/H}
 function kmPerPx(){return worldPerPx()*KM}

 function setView(v,anim=true){if(v===st.view)return;st.view=v;tween=null;
  if(v==='map'){st.cx=st.lon0;st.cy=st.lat0;st.h=Math.max(.15,(st.dist-1)*1.05);clampMap()}
  else{st.lon0=st.cx;st.lat0=st.cy;st.dist=clamp(1+st.h*.95,1.25,3.6);clampGlobe()}
  st.tt=v==='map'?1:0;if(!anim)st.t=st.tt;cb.view&&cb.view(v)}

 function flyTo(lls,opt={}){if(!lls.length)return;const dur=opt.dur??900,minA=(opt.minKm||0)/KM;
  if(st.view==='globe'){let x=0,y=0,z=0;for(const p of lls){const v=sph(p[0]*DEG,p[1]*DEG);x+=v.x;y+=v.y;z+=v.z}
   const n=Math.hypot(x,y,z)||1;const lat=Math.asin(y/n),lon=Math.atan2(x,z);let m=0;for(const p of lls)m=Math.max(m,d3.geoDistance([lon/DEG,lat/DEG],p));
   m=Math.max(m,minA);const eff=TANV*Math.min(1,W/H);const dist=clamp(1+(1.25*m/eff+.04)/(opt.fit||1),1.34,Math.min(opt.maxDist||9,fullDist()));
   let sh=0;if(opt.shiftY){const s=opt.shiftY*2*TANV;let lo=0,hi=Math.acos(1/dist);for(let i=0;i<30;i++){const mid=(lo+hi)/2;if(Math.sin(mid)<s*(dist-Math.cos(mid)))lo=mid;else hi=mid}sh=lo}tween={k:'g',from:{lon0:st.lon0,lat0:st.lat0,dist:st.dist},to:{lon0:st.lon0+wrapA(lon-st.lon0),lat0:clamp(lat+sh,-80*DEG,80*DEG),dist},s:performance.now(),d:dur}}
  else{const xs=lls.map(p=>p[0]*DEG),ys=lls.map(p=>p[1]*DEG);const x0=Math.min(...xs),x1=Math.max(...xs),y0=Math.min(...ys),y1=Math.max(...ys);
   const sx=Math.max(x1-x0,minA*2),sy=Math.max(y1-y0,minA*2);const h=Math.max(sy*.75/TANV/(opt.fit||1),sx*.75/(TANV*W/H),.34);
   tween={k:'m',from:{cx:st.cx,cy:st.cy,h:st.h},to:{cx:(x0+x1)/2,cy:(y0+y1)/2+(opt.shiftY||0)*2*Math.min(h,hMax())*TANV,h:Math.min(h,hMax())},s:performance.now(),d:dur}}}

 /* ---------- input ---------- */
 const ptrs=new Map();let drag=null,pinch=null,hoverQ=null,hoverId=null;
 function ndc(x,y){const r=canvas.getBoundingClientRect();return new THREE.Vector2((x-r.left)/r.width*2-1,-((y-r.top)/r.height)*2+1)}
 function pick(x,y){if(st.t>0&&st.t<1)return null;const rc=new THREE.Raycaster();rc.setFromCamera(ndc(x,y),cam);const ray=rc.ray.clone();
  group.updateMatrixWorld();ray.applyMatrix4(new THREE.Matrix4().copy(group.matrixWorld).invert());
  if(st.view==='globe'){const p=new THREE.Vector3();if(!ray.intersectSphere(new THREE.Sphere(new THREE.Vector3(),1),p))return null;return[Math.atan2(p.x,p.z)/DEG,Math.asin(clamp(p.y,-1,1))/DEG]}
  const p=new THREE.Vector3();if(!ray.intersectPlane(new THREE.Plane(new THREE.Vector3(0,0,1),0),p))return null;if(Math.abs(p.x)>Math.PI||Math.abs(p.y)>Math.PI/2)return null;return[p.x/DEG,p.y/DEG]}
 function panBy(dx,dy){if(st.view==='globe'){const k=(st.dist-1)*2*TANV/H*1.05;st.lon0-=dx*k/Math.max(.45,Math.cos(st.lat0));st.lat0+=dy*k;clampGlobe()}
  else{const k=st.h*2*TANV/H;st.cx-=dx*k;st.cy+=dy*k;clampMap()}}
 function zoomAt(f,x,y){tween=null;st.vx=st.vy=0;if(st.view==='globe'){st.dist=1+(st.dist-1)*f;clampGlobe();return}
  const n=ndc(x,y),vh=st.h*TANV,vw=vh*W/H;const wx=st.cx+n.x*vw,wy=st.cy+n.y*vh;st.h*=f;clampMap();const vh2=st.h*TANV,vw2=vh2*W/H;st.cx=wx-n.x*vw2;st.cy=wy-n.y*vh2;clampMap()}
 function bindInput(){
  canvas.style.touchAction='none';
  canvas.addEventListener('pointerdown',e=>{canvas.setPointerCapture(e.pointerId);ptrs.set(e.pointerId,{x:e.clientX,y:e.clientY});tween=null;st.vx=st.vy=0;
   if(ptrs.size===1)drag={x:e.clientX,y:e.clientY,sx:e.clientX,sy:e.clientY,t:performance.now(),moved:false,lt:performance.now()};
   else if(ptrs.size===2){const [a,b]=[...ptrs.values()];pinch={d:Math.hypot(a.x-b.x,a.y-b.y),mx:(a.x+b.x)/2,my:(a.y+b.y)/2};if(drag)drag.moved=true}});
  canvas.addEventListener('pointermove',e=>{
   if(!ptrs.has(e.pointerId)){if(e.pointerType==='mouse'&&hoverOn){hoverQ=[e.clientX,e.clientY]}return}
   ptrs.set(e.pointerId,{x:e.clientX,y:e.clientY});
   if(ptrs.size>=2&&pinch){const [a,b]=[...ptrs.values()];const d=Math.hypot(a.x-b.x,a.y-b.y),mx=(a.x+b.x)/2,my=(a.y+b.y)/2;
    if(st.t===0||st.t===1){zoomAt(pinch.d/d,mx,my);if(st.view!=='globe')panBy(mx-pinch.mx,my-pinch.my)}pinch={d,mx,my};return}
   if(drag){const dx=e.clientX-drag.x,dy=e.clientY-drag.y;if(!drag.moved&&Math.hypot(e.clientX-drag.sx,e.clientY-drag.sy)>7)drag.moved=true;
    if(drag.moved&&(st.t===0||st.t===1)){panBy(dx,dy);const now=performance.now(),dt=Math.max(1,now-drag.lt);st.vx=dx/dt;st.vy=dy/dt;drag.lt=now}
    drag.x=e.clientX;drag.y=e.clientY}});
  const up=e=>{if(!ptrs.has(e.pointerId))return;ptrs.delete(e.pointerId);
   if(ptrs.size===0){if(drag&&!drag.moved&&performance.now()-drag.t<700&&!pinch){const ll=pick(e.clientX,e.clientY);if(ll&&cb.tap)cb.tap(ll)}
    if(drag&&(drag.np||performance.now()-drag.lt>80)){st.vx=st.vy=0}drag=null;pinch=null}
   else if(ptrs.size===1){pinch=null;const p=[...ptrs.values()][0];drag={x:p.x,y:p.y,sx:p.x,sy:p.y,t:0,moved:true,lt:performance.now(),np:true}}};
  canvas.addEventListener('pointerup',up);canvas.addEventListener('pointercancel',up);
  canvas.addEventListener('pointerleave',e=>{if(e.pointerType==='mouse'){hoverQ=null;if(hoverId){hoverId=null;setLine(hoverLine,null)}}});
  canvas.addEventListener('wheel',e=>{e.preventDefault();const f=Math.exp(clamp(e.deltaY,-120,120)*.0018);zoomAt(f,e.clientX,e.clientY)},{passive:false});
 }

 /* ---------- countries ---------- */
 function nearestVertex(x,p){let best=Infinity,bp=null;for(const r of ringsOf(x.f))for(const v of r){const d=d3.geoDistance(v,p);if(d<best){best=d;bp=v}}return{d:best*KM,pt:bp}}
 function containsAt(p,filter){for(const x of feats){if(filter&&!filter(x))continue;if(d3.geoDistance(p,x.c)>x.rad+1e-3)continue;if(d3.geoContains(x.f,p))return x}return null}
 function findCountry(p,snapPx=22,filter){const snapKm=snapPx*kmPerPx();const inside=containsAt(p,filter);
  let best=null;for(const x of feats){if(filter&&!filter(x))continue;if(x===inside)continue;if(d3.geoDistance(p,x.c)*KM-x.rad*KM>snapKm)continue;
   if(inside&&x.area>inside.area*.05)continue;const nv=nearestVertex(x,p);if(nv.d<=snapKm&&(!best||nv.d<best.d))best={x,d:nv.d,pt:nv.pt}}
  if(best&&(!inside||x_small(best.x)))return{id:best.x.id,ll:best.pt,snapped:true};
  if(inside)return{id:inside.id,ll:p,snapped:false};return null}
 const x_small=x=>x.area<30000;
 function distToCountry(id,p){const xs=byN[id]||[];for(const x of xs)if(d3.geoContains(x.f,p))return{d:0,pt:p,inside:true};let b={d:Infinity,pt:null};for(const x of xs){const r=nearestVertex(x,p);if(r.d<b.d)b=r}return{...b,inside:false}}
 function countryArea(id){return(byN[id]||[]).reduce((s,x)=>s+x.area,0)}
 function countryPts(id){const polys=[];for(const x of byN[id]||[]){const g=x.f.geometry;if(!g)continue;(g.type==='Polygon'?[g.coordinates]:g.type==='MultiPolygon'?g.coordinates:[]).forEach(p=>{const P={type:'Polygon',coordinates:p};polys.push({p,a:d3.geoArea(P),c:d3.geoCentroid(P)})})}
  if(!polys.length)return[];polys.sort((a,b)=>b.a-a.a);const main=polys[0];const keep=polys.filter(q=>q===main||d3.geoDistance(q.c,main.c)*KM<1200);
  const pts=[main.c];for(const q of keep)for(const r of q.p)for(let i=0;i<r.length;i+=Math.max(1,r.length/30|0))pts.push(r[i]);return pts}

 /* ---------- overlay ---------- */
 function drawOverlay(){if(!octx)return;const c=octx;c.clearRect(0,0,OW,OH);const path=d3.geoPath(oproj,c);
  const fill=(id,col)=>{if(!id)return;c.beginPath();for(const x of byN[id]||[])path(x.f);c.fillStyle=col;c.fill()};
  if(O.colors){const gr={};for(const id in O.colors)(gr[O.colors[id]]=gr[O.colors[id]]||[]).push(id);for(const col in gr){c.beginPath();for(const id of gr[col])for(const x of byN[id]||[])path(x.f);c.fillStyle=col;c.fill()}}
  if(O.region){c.beginPath();for(const x of feats){const k=nToC[x.id];if(k&&k.r===O.region)path(x.f)}c.fillStyle='rgba(255,206,96,.30)';c.fill()}
  if(O.hintCountry)fill(O.hintCountry,'rgba(255,206,96,.42)');
  if(O.circle){c.beginPath();path(d3.geoCircle().center(O.circle.ll).radius(O.circle.km/111.2).precision(2)());c.fillStyle='rgba(255,206,96,.22)';c.fill();c.lineWidth=OW/1400;c.setLineDash([OW/300,OW/500]);c.strokeStyle='rgba(255,214,110,.95)';c.stroke();c.setLineDash([])}
  fill(O.miss,'rgba(240,96,74,.55)');fill(O.target,'rgba(60,200,135,.62)');fill(O.sel,'rgba(110,150,255,.55)');
  otex.needsUpdate=true}
 function setOverlay(o){O=o||{};drawOverlay()}
 function setOutline(id,color){if(!selLine)return;if(!id){setLine(selLine,null);return}const xs=byN[id]||[];
  const merged={geometry:{type:'MultiPolygon',coordinates:xs.flatMap(x=>x.f.geometry.type==='Polygon'?[x.f.geometry.coordinates]:x.f.geometry.coordinates)}};
  setLine(selLine,merged);selLine.material.color.set(color||0xffffff)}

 /* ---------- markers ---------- */
 let UP;
 function mkPin(){const g=new THREE.Group();const col=0xF2B53A;
  const stem=new THREE.Mesh(new THREE.CylinderGeometry(.035,.012,.72,10),new THREE.MeshPhongMaterial({color:0xdfe6ea,shininess:60}));stem.position.y=.36;g.add(stem);
  const head=new THREE.Mesh(new THREE.SphereGeometry(.2,24,16),new THREE.MeshPhongMaterial({color:col,emissive:0x5a3a00,shininess:80}));head.position.y=.84;g.add(head);
  const sh=new THREE.Mesh(new THREE.CircleGeometry(.16,24).rotateX(-Math.PI/2),new THREE.MeshBasicMaterial({color:0x000000,transparent:true,opacity:.35,depthWrite:false}));sh.position.y=.004;g.add(sh);
  return{obj:g,px:32}}
 function mkRing(color,px){const g=new THREE.Group();
  const ring=new THREE.Mesh(new THREE.RingGeometry(.55,.75,40).rotateX(-Math.PI/2),new THREE.MeshBasicMaterial({color,transparent:true,depthWrite:false,side:THREE.DoubleSide}));ring.position.y=.01;g.add(ring);
  const dot=new THREE.Mesh(new THREE.CircleGeometry(.26,24).rotateX(-Math.PI/2),new THREE.MeshBasicMaterial({color,depthWrite:false,transparent:true}));dot.position.y=.012;g.add(dot);
  const pulse=new THREE.Mesh(new THREE.RingGeometry(.7,.8,40).rotateX(-Math.PI/2),new THREE.MeshBasicMaterial({color,transparent:true,depthWrite:false,side:THREE.DoubleSide}));pulse.position.y=.01;g.add(pulse);
  return{obj:g,px,pulse}}
 function addMarker(kind,ll,opt={}){const m=kind==='pin'?mkPin():mkRing(opt.color||0x3CC887,opt.px||26);m.kind=kind;m.ll=ll;m.born=performance.now();m.obj.renderOrder=6;
  m.obj.traverse(o=>{o.renderOrder=6});group.add(m.obj);markers.push(m);return m}
 function removeMarkers(kind){markers=markers.filter(m=>{if(!kind||m.kind===kind){group.remove(m.obj);return false}return true})}
 function setPin(ll){removeMarkers('pin');if(ll)addMarker('pin',ll)}
 function setArc(a,b){if(arc){group.remove(arc.mesh);arc.mesh.geometry.dispose();arc=null}if(!a||!b)return;
  const ang=d3.geoDistance(a,b);if(ang<1e-4)return;const ip=d3.geoInterpolate(a,b);
  arc={pts:Array.from({length:49},(_,i)=>ip(i/48)),ang,born:performance.now(),key:'',mesh:new THREE.Mesh(new THREE.BufferGeometry(),new THREE.MeshBasicMaterial({color:0xffffff,transparent:true,opacity:.95,depthWrite:false}))};
  arc.mesh.renderOrder=7;arc.mesh.frustumCulled=false;group.add(arc.mesh)}
 function updateArc(e,wpp,now){if(!arc)return;const k=e.toFixed(3)+'_'+(wpp*1e4|0);const prog=Math.min(1,(now-arc.born)/700);
  if(k!==arc.key){arc.key=k;const lift=Math.min(.09,arc.ang*.1)*(1-e);
   const v=arc.pts.map((p,i)=>{const s=i/48,lo=p[0]*DEG,la=p[1]*DEG;const pos=localPos(lo,la,1.003,.005,e);pos.add(localNormal(lo,la,e).multiplyScalar(Math.sin(Math.PI*s)*(lift+wpp*6*(1-e))));return pos});
   const g=new THREE.TubeGeometry(new THREE.CatmullRomCurve3(v),96,wpp*2.2,6,false);arc.mesh.geometry.dispose();arc.mesh.geometry=g}
  arc.mesh.geometry.setDrawRange(0,Math.ceil(96*ease(prog))*6*6)}
 function clearAll(){removeMarkers();setArc(null);setOverlay({});setOutline(null);if(hoverLine){setLine(hoverLine,null);hoverId=null}}

 /* ---------- loop ---------- */
 let qI,qG,eul;
 function frame(now){raf=requestAnimationFrame(frame);const dt=Math.min(50,now-(last||now));last=now;
  if(tween){const p=tween.d>0?clamp((now-tween.s)/tween.d,0,1):1,k=ease(p);for(const key in tween.to)st[key]=lerp(tween.from[key],tween.to[key],k);if(st.view==='globe')clampGlobe();else clampMap();if(p>=1)tween=null}
  if(!drag&&!pinch&&(Math.abs(st.vx)>.01||Math.abs(st.vy)>.01)){panBy(st.vx*dt,st.vy*dt);st.vx*=.9;st.vy*=.9}
  if(st.t!==st.tt){st.t=st.tt>st.t?Math.min(st.tt,st.t+dt/1100):Math.max(st.tt,st.t-dt/1100)}
  const e=ease(st.t);U.morph.value=e;
  qG.setFromEuler(eul.set(st.lat0,-st.lon0,0,'XYZ'));group.quaternion.copy(qG).slerp(qI,e);
  cam.position.set(lerp(0,st.cx,e),lerp(0,st.cy,e),lerp(st.dist,st.h,e));cam.rotation.set(0,0,0);
  const surf=lerp(st.dist-1,st.h,e);cam.near=clamp(surf*.15,.002,.5);cam.far=150;cam.updateProjectionMatrix();
  light.position.copy(cam.position).add(new THREE.Vector3(-1.6,1.3,2.2));light.target.position.set(cam.position.x,cam.position.y,0);
  atmo.material.uniforms.op.value=Math.pow(1-e,2);atmo.visible=e<.99;stars.material.opacity=.75*(1-e*.6);
  earthMat.specular.setRGB(.16*(1-e),.29*(1-e),.44*(1-e));amb.intensity=lerp(.32,.62,e);light.intensity=lerp(1.05,.55,e);
  cloudMesh.visible=cloudsOn&&e<.98&&!!cloudMat.alphaMap;cloudMat.opacity=.85*(1-e);
  const wpp=worldPerPx();
  for(const m of markers){const lo=m.ll[0]*DEG,la=m.ll[1]*DEG;m.obj.position.copy(localPos(lo,la,1.001,.004,e));m.obj.quaternion.setFromUnitVectors(UP,localNormal(lo,la,e));
   const age=Math.min(1,(now-m.born)/350);let s=m.px*wpp;if(m.kind==='pin')s*=age<1?1+.35*Math.sin(age*Math.PI):1;else s*=.6+.4*ease(age);m.obj.scale.setScalar(s);
   if(m.pulse){const ph=((now-m.born)%1600)/1600;m.pulse.scale.setScalar(1+ph*1.4);m.pulse.material.opacity=.8*(1-ph)}}
  updateArc(e,wpp,now);
  if(hoverQ&&hoverOn){const q=hoverQ;hoverQ=null;const ll=pick(q[0],q[1]);const h=ll?findCountry(ll,14):null;const id=h?h.id:null;if(id!==hoverId){hoverId=id;const xs=id?byN[id]:null;
    setLine(hoverLine,xs?{geometry:{type:'MultiPolygon',coordinates:xs.flatMap(x=>x.f.geometry.type==='Polygon'?[x.f.geometry.coordinates]:x.f.geometry.coordinates)}}:null);canvas.style.cursor=id?'pointer':'crosshair'}}
  R.render(scene,cam)}
 function resize(){if(!host)return;W=Math.max(1,host.clientWidth);H=Math.max(1,host.clientHeight);R.setSize(W,H,false);cam.aspect=W/H;cam.updateProjectionMatrix();if(st.view==='map')clampMap()}

 return{
  supported,init,
  attach(h){host=h;h.prepend(canvas);resize();ro=new ResizeObserver(resize);ro.observe(h);cancelAnimationFrame(raf);last=0;raf=requestAnimationFrame(frame)},
  detach(){if(ro){ro.disconnect();ro=null}cancelAnimationFrame(raf);raf=0;if(canvas&&canvas.parentNode)canvas.remove();host=null;cb.tap=null;cb.view=null;tween=null;st.vx=st.vy=0},
  on(k,f){cb[k]=f},get view(){return st.view},setView,flyTo,zoomBy(f){if(!host)return;const r=canvas.getBoundingClientRect();zoomAt(f,r.left+r.width/2,r.top+r.height/2)},
  setBorders(b){bordersOn=b;if(borders)borders.visible=b},setHover(b){hoverOn=b;if(!b&&hoverLine){setLine(hoverLine,null);hoverId=null}},
  setClouds(b){cloudsOn=b;if(b&&cloudMat)loadClouds()},
  findCountry,distToCountry,countryArea,countryPts,containsAt,setOverlay,setOutline,setPin,addMarker,removeMarkers,setArc,clearAll,kmPerPx
 }})();
