# xlsx exchange
xlsx data format conversion for x-spreadsheet

## 项目介绍
`xlsx-exchange` 基于xlsx和xlsx-style实现excel文件转换为x-spreadsheet可加载的数据格式


## 功能介绍
* 支持文本内容
* 支持单元格边框线型、颜色
* 支持单元格文本对齐方式
* 支持单元格填充颜色
* 支持单元格字体大小、颜色
* 支持获取行高、列宽
* 支持文本换行

### 引用

```
npm install xlsx
npm install xlsx-style
npm install xlsx-exchange
```

### 使用

**js**

```javascript
import XLSX from 'xlsx';
import XStyle from 'xlsx-style';
import Exchange from 'xlsx-exchange';
//导入数据
importFile(inputfile) {
    let file = inputfile.file;
    var reader = new FileReader();
    reader.onload = function (e) {
        var data = e.target.result;
        var wbs = XStyle.read(data, {type: "binary",cellStyles: true});
        var wb = XLSX.read(data, { type: "binary", cellStyles: true });
        //stox中第二个参数为非必传
        let out = Exchange.stox(wbs, wb);
    };
    reader.readAsBinaryString(file);
},
//导出数据
exportFile(outData){
    var new_wb = Exchange.xtos(outData);
    XLSX.writeFile(new_wb, "SheetJS.xlsx");
}

```

## 其他
需要注意XLSX和XLSX的区别  
使用XLSX社区版时XLSX.read读取不到单元格的字体、边框、对齐方式等  
使用XLSX-style读取不到行高信息，导出数据不能使用writeFile方式（待验证）

所以`xlsx-exchange`支持同时采用XLSX和XLSX-style

thanks 
https://github.com/SheetJS/sheetjs
https://github.com/protobi/js-xlsx
https://github.com/myliang/x-spreadsheet


