'use strict';
const byId=id=>document.getElementById(id);
function inviteLink(name,title=''){const url=new URL('index.html',location.href);url.search='';url.hash='';url.searchParams.set('guest',name.trim().slice(0,200));if(title.trim())url.searchParams.set('title',title.trim().slice(0,250));return url.href;}
byId('maker').addEventListener('submit',e=>{e.preventDefault();const name=byId('name').value.trim();if(!name){byId('message').textContent='Please enter a guest name.';return;}const url=inviteLink(name,byId('title').value);byId('result').value=url;byId('preview').href=url;byId('single-output').hidden=false;byId('message').textContent='Your guest invitation link is ready.';});
byId('copy').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(byId('result').value);byId('message').textContent='Invitation link copied.';}catch{byId('result').focus();byId('result').select();byId('message').textContent='Select and copy the link above.';}});
let rows=[];
byId('batch').addEventListener('click',()=>{const lines=byId('names').value.split(/\r?\n/).map(s=>s.trim()).filter(Boolean);byId('batch-results').replaceChildren();rows=[];byId('download').hidden=true;if(!lines.length){byId('message').textContent='Enter at least one guest name.';return;}if(lines.length>500){byId('message').textContent='Please create batches of 500 names or fewer.';return;}for(const line of lines){const [name,...rest]=line.split('|');if(!name.trim())continue;const title=rest.join('|').trim();const url=inviteLink(name,title);rows.push([name.trim().slice(0,200),title.slice(0,250),url]);const link=document.createElement('a');link.href=url;link.target='_blank';link.rel='noopener';link.textContent=name.trim()+' ↗';byId('batch-results').append(link);}byId('download').hidden=!rows.length;byId('message').textContent=`${rows.length} invitation links created.`;});
function csvCell(value){const safe=/^[=+@\-\t\r]/.test(value)?"'"+value:value;return '"'+safe.replaceAll('"','""')+'"';}
byId('download').addEventListener('click',()=>{if(!rows.length)return;const csv='\uFEFF'+[['Guest','Position','Invitation link'],...rows].map(r=>r.map(csvCell).join(',')).join('\r\n');const url=URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='RARA-2026-guest-links.csv';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);});
let importedBook;
function importSelectedSheet(){
 try{
  const matrix=XLSX.utils.sheet_to_json(importedBook.Sheets[byId('guest-sheet').value],{header:1,defval:'',raw:false});
  const guests=extractGuests(matrix);
  const overlong=guests.filter(g=>g.name.length>200||g.title.length>250);
  if(overlong.length)throw Error('Some names or titles exceed the invitation limit. Shorten them in Excel before importing.');
  byId('names').value=guests.map(g=>g.name+(g.title?' | '+g.title:'')).join('\n');
  rows=[];byId('batch-results').replaceChildren();byId('download').hidden=true;
  const review=guests.filter(g=>g.review).length;
  byId('import-status').textContent=`${guests.length} entries imported. ${review?review+' accompanying-guest entries need names. ':''}Review names and current titles below, then create links. Existing status marks are not treated as 2026 confirmations.`;
 }catch(error){byId('import-status').textContent=error.message;}
}
byId('guest-file').addEventListener('change',async e=>{
 const file=e.target.files[0];if(!file)return;
 try{
  if(file.size>10*1024*1024)throw Error('Please choose a guest list smaller than 10 MB.');
  importedBook=XLSX.read(await file.arrayBuffer(),{type:'array',cellHTML:false,cellFormula:false});
  byId('guest-sheet').replaceChildren();
  for(const name of importedBook.SheetNames){const option=document.createElement('option');option.value=name;option.textContent=name;byId('guest-sheet').append(option);}
  byId('guest-sheet').hidden=importedBook.SheetNames.length<2;byId('sheet-label').hidden=byId('guest-sheet').hidden;
  importSelectedSheet();
 }catch(error){byId('import-status').textContent='Unable to import: '+error.message;}
});
byId('guest-sheet').addEventListener('change',importSelectedSheet);
