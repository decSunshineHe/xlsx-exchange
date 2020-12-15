import XLSX from 'xlsx'
export default Exchange = {
    //excel -> data
    stox(wb) {
        var out = [];
        wb.SheetNames.forEach(function (name) {
            var o = { name: name, rows: {}, merges: [] };
            var ws = wb.Sheets[name];
            var aoa = XLSX.utils.sheet_to_json(ws, { raw: false, header: 1 });
            //获取cell内容
            aoa.forEach(function (r, i) {
                var cells = {};
                r.forEach(function (c, j) {
                    cells[j] = { text: c };
                });
                o.rows[i] = { cells: cells };
            });
            //获取合并单元格
            if (ws["!merges"]) {
                let merges = ws["!merges"];
                merges.forEach((item, i) => {
                    let rMerge = item.e.r - item.s.r;
                    let cMerge = item.e.c - item.s.c;
                    o.rows[item.s.r]["cells"][item.s.c].merge = [rMerge, cMerge];

                    let scell = XLSX.utils.encode_cell(item.s);
                    let ecell = XLSX.utils.encode_cell(item.e);
                    o.merges.push(scell + ":" + ecell);
                });
            }
            out.push(o);
        });
        return out;
    },
    //data -> excel
    xtos(sdata) {
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
    },
}