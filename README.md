# xlsx exchange
xlsx data format conversion for xspreadsheet

### Install

```
npm install xlsx-exchange
```

### Usage

**js**

```javascript
import Exchange from 'xlsx-exchange';
//导入数据
let out = Exchange.stox(workbook);
//导出数据
var new_wb = Exchange.xtos(this.sheet.getData());
```

