import XLSX from 'xlsx';

var Exchange = {
  //excel -> data
  stox: function stox(wb) {
    var out = [];
    wb.SheetNames.forEach(function (name) {
      var o = {
        name: name,
        rows: {},
        cols: {},
        merges: [],
        styles: []
      };
      var ws = wb.Sheets[name];
      var aoa = XLSX.utils.sheet_to_json(ws, {
        raw: false,
        header: 1
      }); //获取cell内容

      var styleIndex = 0;
      aoa.forEach(function (r, i) {
        var cells = {};
        r.forEach(function (c, j) {
          var cellIndex = XLSX.utils.encode_cell({
            c: j,
            r: i
          });

          if (ws[cellIndex]['s']) {
            var cellstyle = ws[cellIndex]['s'];
            var oCellstyle = {};
            cells[j] = {
              text: c,
              style: styleIndex
            }; //填充

            if (cellstyle['fill']) {
              var bgargb = cellstyle['fill']['fgColor']['rgb'];
              oCellstyle.bgcolor = '#' + bgargb.slice(2);
            } //字体


            if (cellstyle['font']) {
              oCellstyle.font = {
                bold: cellstyle['font']['bold'] || false,
                size: cellstyle['font']['sz'] || 11
              };

              if (cellstyle['font']['color']) {
                var fcargb = cellstyle['font']['color']['rgb'];

                if (fcargb == '000000') {
                  oCellstyle.color = '#FFFFFF';
                } else {
                  oCellstyle.color = '#' + fcargb.slice(2);
                }
              }
            } //边框


            if (cellstyle['border']) {
              oCellstyle.border = {};

              for (var key in cellstyle['border']) {
                var brargb = cellstyle['border'][key]['color']['rgb'];
                var obrargb = brargb ? '#' + brargb : "#000000";
                oCellstyle.border[key] = [cellstyle['border'][key]['style'], obrargb];
              }
            } //对齐


            if (cellstyle['alignment']) {
              var align = cellstyle['alignment']['horizontal'];
              oCellstyle.align = align ? align : 'center';
              var valign = cellstyle['alignment']['vertical'];
              oCellstyle.valign = !valign || valign == 'center' ? 'middle' : valign;
            }

            o.styles[styleIndex] = oCellstyle;
            styleIndex++;
          } else {
            cells[j] = {
              text: c
            };
          }
        });
        o.rows[i] = {
          cells: cells
        };
      }); //获取合并单元格

      if (ws["!merges"]) {
        var merges = ws["!merges"];
        merges.forEach(function (item) {
          var rMerge = item.e.r - item.s.r;
          var cMerge = item.e.c - item.s.c;
          var range = XLSX.utils.encode_range(item);
          o.rows[item.s.r]["cells"][item.s.c].merge = [rMerge, cMerge];
          o.merges.push(range);
        });
      } //获取列宽度


      if (ws["!cols"]) {
        var cols = ws["!cols"];
        cols.forEach(function (item, index) {
          o.cols[index] = {};
          o.cols[index]["width"] = item.wpx;
        });
      }

      out.push(o);
    });
    return out;
  },
  //data -> excel
  xtos: function xtos(sdata) {
    var out = XLSX.utils.book_new();
    sdata.forEach(function (xws) {
      var aoa = [[]];
      var rowobj = xws.rows;

      for (var ri = 0; ri < rowobj.len; ++ri) {
        var row = rowobj[ri];
        if (!row) continue;
        aoa[ri] = [];
        Object.keys(row.cells).forEach(function (k) {
          var idx = +k;
          if (isNaN(idx)) return;
          aoa[ri][idx] = row.cells[k].text;
        });
      }

      var ws = XLSX.utils.aoa_to_sheet(aoa);
      XLSX.utils.book_append_sheet(out, ws, xws.name);
    });
    return out;
  }
};

export default Exchange;
