<template>
<div class="layout">
<el-form ref="form" :model="form" label-width="160px">
	<el-form-item label="允许注册" v-show='false'>
		<el-select v-model="form.ableRegister" style='width:400px'>
		  <el-option label="正常注册" value="0"></el-option>
		  <el-option label="非正常注册" value="1"></el-option>
		</el-select>
  	</el-form-item> 
	<el-form-item label="开启注册赠送">
		<el-select v-model="form.openRegister" style='width:400px'>
		  <el-option label="禁止" value="1"></el-option>
		  <el-option label="启用" value="0"></el-option>
		</el-select>
  	</el-form-item> 
	<el-form-item label="注册赠送币种">
		<el-select v-model="form.currId" style='width:400px'>
		   <el-option  v-for="item in options"
          :key="item.value"
          :label="item.shortName"
          :value="item.id"></el-option>
		</el-select>
  	</el-form-item>  
	<el-form-item label="一代赠送数量">
		<el-input v-model="form.oneNum"  placeholder="一代赠送数量"></el-input>
	</el-form-item>   
	<el-form-item label="二代赠送数量">
		<el-input v-model="form.twoNum"  placeholder="二代赠送数量"></el-input>
	</el-form-item>   
	<el-form-item label="三代赠送数量">
		<el-input v-model="form.threeNum"  placeholder="三代赠送数量"></el-input>
	</el-form-item>
	<el-form-item>
		<el-button type="primary" @click="onSubmit">确定</el-button>
		<el-button>取消</el-button>
	</el-form-item>
</el-form>
</div>
</template>

<script>
    import Get from '@/api/get.js'
    import Post from '@/api/post.js'
    export default {
        data() {
            return {
                options:[],
                form: {
                    ableRegister: "", //	必填
                    openRegister: "", //	必填
                    currId: "", //	必填
                    oneNum: "", //	必填
                    twoNum: "", //	必填
                    threeNum: "", //	必填
                    id: "", //必填
                }
            }
        },
        methods: {
            onSubmit() {
                Post({
                    url: 'set/register/update',
                    data: {
                        ableRegister: this.form.ableRegister,
                        openRegister: this.form.openRegister,
                        currId: this.form.currId,
                        oneNum: this.form.oneNum,
                        twoNum: this.form.twoNum,
                        threeNum: this.form.threeNum,
                        id: this.form.id,
                    },
                    success: res => {
                    }

                })
            }
        },
        created() {
            Get({
                url: 'set/register/find',
                success: res => {
                    this.options = res.data.list;
                    this.form = res.data.rc;
                    for (var k in this.form) {
                        this.form[k] = this.form[k] + '';
                    }
                }
            })
        }

    }

</script>

<style scoped>
    .layout {
        width: 600px;
    }

</style>
