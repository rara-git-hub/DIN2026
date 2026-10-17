/* Read only the named guest table, never seating cells or workbook instructions. */
(function(root){
'use strict';
const clean=value=>String(value??'').replace(/\s+/g,' ').trim();
function extractGuests(matrix){
 const nameHeaders=['ឈ្មោះ','name','guest','guest name'];
 const headerIndex=matrix.findIndex(row=>row.some(cell=>nameHeaders.includes(clean(cell).toLowerCase())));
 if(headerIndex<0)throw Error('No guest-name header found. Use the supplied layout or columns named Name, Rank and Position.');
 const headers=matrix[headerIndex].map(v=>clean(v).toLowerCase());
 const nameCol=headers.findIndex(v=>nameHeaders.includes(v));
 const rankCol=headers.findIndex(v=>['ឋានន្តរស័ក្តិ','rank'].includes(v));
 const titleCol=headers.findIndex(v=>['មុខតំណែង','position','title'].includes(v));
 const result=[];
 for(let i=headerIndex+1;i<matrix.length;i++){
  const raw=clean(matrix[i][nameCol]);if(!raw)continue;
  const name=raw.replace(/\s+VVIP\s*$/i,'').trim();
  const parts=[rankCol>=0?clean(matrix[i][rankCol]):'',titleCol>=0?clean(matrix[i][titleCol]):''].filter(Boolean);
  const title=[...new Set(parts)].join(' · ');
  result.push({name,title,sourceRow:i+1,review:name.startsWith('ភ្ញៀវ ')||/^(guest|tbd|unknown)(\s|$)/i.test(name),note:raw!==name?'VVIP planning label omitted from salutation.':''});
 }
 if(!result.length)throw Error('No guest rows found below the header.');
 if(result.length>500)throw Error('Please use a list of 500 guests or fewer.');
 return result;
}
root.extractGuests=extractGuests;
if(typeof module!=='undefined')module.exports={extractGuests};
})(typeof globalThis!=='undefined'?globalThis:this);
