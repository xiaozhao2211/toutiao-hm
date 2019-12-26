<template>
  <el-card>
      <bread-crumb slot="header">
      <!-- 插槽内容 -->
      <template slot="title">发布文章</template>
      </bread-crumb>
      <el-form style="padding-left:50px">
        <el-form-item label="标题">
           <el-input placeholder="文章名称" style="width:400px"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <el-input type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="封面">
          <el-radio-group>
            <el-radio>单图</el-radio>
            <el-radio>三图</el-radio>
            <el-radio>无图</el-radio>
            <el-radio>自动</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <el-select placeholder="请选择">
            <el-option></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">发表</el-button>
          <el-button>存入草稿</el-button>
        </el-form-item>
      </el-form>
  </el-card>
</template>

<script>
export default {

}
</script>

<style>

</style>
