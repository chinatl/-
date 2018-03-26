<template>
 <div class="layout">
  <el-table
    :data="tableData"
    stripe
    border
    style="width: 100%">
    <el-table-column
      prop="date"
      label="标识"
      width="50">
    </el-table-column>
    <el-table-column
      prop="name"
      label="标题"
      width="180">
    </el-table-column>
    <el-table-column
      prop="address"
       width="130"
      label="官网">
    </el-table-column>
    <el-table-column
      prop="address1"
      label="文字短信">
    </el-table-column>
    <el-table-column
      prop="address2"
      label="语音短信">
    </el-table-column>
    <el-table-column
      prop="address3"
      label="国际短信">
    </el-table-column>
    <el-table-column
      prop="address4"
      label="接口账号">
    </el-table-column>
    <el-table-column
      prop="address5"
      label="状态">
    </el-table-column>
    <el-table-column
      prop="address6"
      label="操作">
    </el-table-column>
  </el-table>
   </div>
</template>
<script>
	export default {
		//	sffd	短信宝	http://baidu.com	不支持	支持	不支持	23429	禁用	编辑 启用
		data() {
			return {
				tableData: [
					{
						date:"sffd",
						name:"短信宝",
						address:"http://baidu.com",
						address1:"不支持",
						address2:"不支持",
						address3:"不支持",
						address4:"不支持",
						address5:"禁用",
						address6:"不支持",
					},	{
						date:"sffd",
						name:"短信宝",
						address:"http://baidu.com",
						address1:"不支持",
						address2:"不支持",
						address3:"不支持",
						address4:"不支持",
						address5:"禁用",
						address6:"不支持",
					},	{
						date:"sffd",
						name:"短信宝",
						address:"http://baidu.com",
						address1:"不支持",
						address2:"不支持",
						address3:"不支持",
						address4:"不支持",
						address5:"禁用",
						address6:"不支持",
					},	{
						date:"sffd",
						name:"短信宝",
						address:"http://baidu.com",
						address1:"不支持",
						address2:"不支持",
						address3:"不支持",
						address4:"不支持",
						address5:"禁用",
						address6:"不支持",
					},	{
						date:"sffd",
						name:"短信宝",
						address:"http://baidu.com",
						address1:"不支持",
						address2:"不支持",
						address3:"不支持",
						address4:"不支持",
						address5:"禁用",
						address6:"不支持",
					},	{
						date:"sffd",
						name:"短信宝",
						address:"http://baidu.com",
						address1:"不支持",
						address2:"不支持",
						address3:"不支持",
						address4:"不支持",
						address5:"禁用",
						address6:"不支持",
					},
				]
			}
		}
	}

</script>
