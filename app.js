const D = window.DATA;
const KEY = "ac-shark-study-v3-public";
const tabs = [["home","Home"],["study","Study"],["books","Books"],["progress","Progress"],["more","More"]];
function defaults(){
  return {view:"home",lessonIndex:0,qId:D.questions[0].id,pick:null,checked:false,answered:0,correct:0,doneLessons:[],missed:[],practiceFilter:"all",practiceLessonId:null,lastExamRight:null,lastExamTotal:null,examSnap:null,streak:0};
}
function load(){
  try { return Object.assign(defaults(), JSON.parse(localStorage.getItem(KEY)||localStorage.getItem("ac-shark-study-v3")||"{}")); }
  catch { return defaults(); }
}
const state = load();
let exam = {running:false,left:D.EXAM_SECONDS,idx:0,setQ:[],picks:[],result:null,endsAt:0};
let examTimer=null, helpOn=false;
function save(){ try{ localStorage.setItem(KEY, JSON.stringify(state)); }catch(e){}
}
function esc(s){ return String(s==null?"":s).replace(/[&<"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;"}[c])); }
function letter(i){ return "ABCD"[i]; }
function hourLabel(){ const h=new Date().getHours(); return h<12?"Good morning":h<17?"Good afternoon":"Good evening"; }
