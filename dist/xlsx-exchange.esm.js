import r from"xlsx";var e={stox:function(e,o){var t=[];return e.SheetNames.forEach((function(l){var s={name:l,rows:{},cols:{},merges:[],styles:[]},n=e.Sheets[l],a=r.utils.sheet_to_json(n,{raw:!1,header:1}),c=0;(a.forEach((function(e,o){var t={};e.forEach((function(e,l){var a=r.utils.encode_cell({c:l,r:o});if(t[l]={text:e},n[a].s){var i=n[a].s,f={};if(i.fill){var h=i.fill.fgColor.rgb;h&&6==h.length?f.bgcolor="#"+h:h&&8==h.length&&(f.bgcolor="#"+h.slice(2))}if(i.font&&(f.font={bold:i.font.bold||!1,size:Number(i.font.sz||11)},i.font.color)){var g=i.font.color.rgb;g&&6==g.length?f.color="000000"==g?"#FFFFFF":"FFFFFF"==g?"#000000":"#"+g:g&&8==g.length&&(f.color="#"+g.slice(2))}if(i.border)for(var v in f.border={},i.border)if(i.border[v].color){var u=i.border[v].color;u.auto&&"1"==u.auto&&(f.border[v]=[i.border[v].style,"#000000"]);var b=i.border[v].color.rgb;if(b&&6==b.length){var d="#"+b;f.border[v]=[i.border[v].style,d]}else if(b&&8==b.length){var m="#"+b.slice(2);f.border[v]=[i.border[v].style,m]}}if(i.alignment){var w=i.alignment.horizontal;f.align=w||"center";var F=i.alignment.vertical;f.valign=F&&"center"!=F?F:"middle";var x=i.alignment.wrapText;x&&"1"==x&&(f.textwrap=!0)}t[l].style=c,s.styles[c]=f,c++}})),s.rows[o]={cells:t}})),n["!merges"])&&n["!merges"].forEach((function(e){var o=e.e.r-e.s.r,t=e.e.c-e.s.c,l=r.utils.encode_range(e);s.rows[e.s.r].cells[e.s.c].merge=[o,t],s.merges.push(l)}));n["!cols"]&&n["!cols"].forEach((function(r,e){s.cols[e]={},s.cols[e].width=111*r.wpx/100}));if(o&&o.Sheets[l]){var i=o.Sheets[l]["!rows"];i&&i.forEach((function(r,e){s.rows[e].height=5*r.hpx/3}))}t.push(s)})),t},xtos:function(e){var o=r.utils.book_new();return e.forEach((function(e){for(var t=[[]],l=e.rows,s=0;s<l.len;++s){var n=l[s];n&&(t[s]=[],Object.keys(n.cells).forEach((function(r){var e=+r;isNaN(e)||(t[s][e]=n.cells[r].text)})))}var a=r.utils.aoa_to_sheet(t);r.utils.book_append_sheet(o,a,e.name)})),o}};export default e;
