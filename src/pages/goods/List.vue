<template>
    <div>
        <el-table ref="multipleTable" :data="goodslist" tooltip-effect="dark" style="width: 100%" @select="changeFun">
            <!-- @selection-change="handleSelectionChange" -->
            <el-table-column type="selection" width="55" ></el-table-column>
            <el-table-column type="index" label="#" width="55"></el-table-column>
            <!-- <el-table-column label="图片" align="center" width="150">
                <template porp="url">
                    <img style="height: 57px;vertical-align: middle;" :src="url">
                </template>
            </el-table-column>-->
            <el-table-column label="书名" prop="itemName"></el-table-column>
            <el-table-column label="作者" prop="author" width="120"></el-table-column>
            <el-table-column label="价格" prop="price" width="120" show-overflow-tooltip></el-table-column>
            <el-table-column label="操作" width="120">
                <!-- 需要获取数据id -->
                <!-- <slot name="title"></slot>
                <slot :row="item"/>-->
                <template v-slot:default="scope">
                    <el-button
                        size="small"
                        plain
                        type="success"
                        icon="el-icon-edit"
                        circle
                        @click="goto(scope.row._id)"
                    ></el-button>

                    <el-button
                        size="small"
                        plain
                        type="danger"
                        icon="el-icon-delete"
                        circle
                        @click="deleteGoods(scope.row._id)"
                    ></el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-button type='danger' v-model="this.pldel" v-if="this.pldel.length > 1" @click="pldelete">批量删除</el-button>
        <el-pagination
            background
            layout="prev, pager, next"
            :total="alldata.length"
            @current-change="handleCurrentChange"
        >
        </el-pagination>
    </div>
</template>
<script>
export default {
    data() {
        return {
            goodslist: [],
            alldata:[],
            pldel:[],
            yema:1,
            bai:''
        };
    },
    async created() {
        const reuslt = await this.$request.get("/goods");
        const reuslt2 = await this.$request.get("/goods?size=0");
        // console.log(reuslt.data.data);
        this.goodslist = reuslt.data.data;
        this.alldata = reuslt2.data.data;
        // console.log(this.goodslist);
    },
    methods: {
        async deleteGoods(id) {
            // const { data } = await this.$request.delete("/user/" + id);
            // this.userlist = this.userlist.filter((item) => item._id !== id);
            this.$confirm("是否删除该商品?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(async () => {
                console.log(id);
                const { data } = await this.$request.delete("/goods/" + id);
                // await this.$request.delete('/goods',id)
                console.log(id);
                if (data.code === 1) {
                    this.goodslist = this.goodslist.filter(
                        item => item._id !== id
                    );
                    this.$message({
                        type: "success",
                        message: "删除成功!"
                    });
                }
            });
        },
        goto(id) {
            this.$router.push({
                name:'goodsEdit',
                params:{id},
                query:{
                    a:10,b:20
                }
            });
        },
        changeFun(selection){
            this.pldel = selection
        },
        async handleCurrentChange(val) {
            const reuslt = await this.$request.get(`/goods?page=${val}`);
            this.yema= val
        // console.log(reuslt.data.data);
            this.goodslist = reuslt.data.data;
        },
        pldelete(){
            this.$confirm("是否删除这批商品？",{
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(async ()=>{
                this.pldel.forEach(async (ele) => {
                    const { data } = await this.$request.delete("/goods/" + ele._id);
                    console.log(data.code);
                    if(data.code!=1){
                        this.bai+=ele.itemName+' '
                    }
                });
                if(this.bai!=''){
                    alert(`${this.bai}删除失败`)
                    this.bai=''
                }
                const reuslt = await this.$request.get(`/goods?page=${this.yema}`);
                this.goodslist = reuslt.data.data;
                
            })
        }
    }
};
</script>
<style lang="scss">
    .pldel{
        margin-top: 10px;
        padding: 10px 15px;
    }
</style>