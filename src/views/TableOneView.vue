<script setup>
import { apiGetUsers, apiPostUsers, apiPutUsers, apiDeleteUsers } from '@/api'

import { ref } from 'vue'

const userForm = ref({
  name: '',
  email: '',
  phone: ''
})

const currentEditId = ref('')

import { useTable } from '@/composables/useTable.js'
const {
  tableData,
  tableDataShow,
  currentPage,
  pageSize,
  handleSizeChange,
  handleAddData,
  addDataDialogVisible,
  addOrEditSure,
  handleEditData,
  handleDeleteData,
  handleSelectItem
} = useTable(apiGetUsers, userForm, apiPostUsers, apiPutUsers, currentEditId, apiDeleteUsers)

// 修改分頁器文字為中文
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
zhCn.el.pagination.total = '共' + `{total}` + '筆'
zhCn.el.pagination.pagesize = '筆/頁'

const dialogTitle = ref('')

const addUser = () => {
  dialogTitle.value = '新增使用者'
  userForm.value = {
    name: '',
    email: '',
    phone: ''
  }
  handleAddData()
}

const editUser = (row) => {
  dialogTitle.value = '編輯使用者'
  userForm.value = {
    id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone
  }
  currentEditId.value = row.id
  handleEditData()
}

const deleteUser = (row) => {
  currentEditId.value = row.id
  handleDeleteData()
}
</script>

<template>
  <div>
    <div class="mb-[20px] flex justify-end">
      <div class="flex items-center space-x-[12px]">
        <el-button type="primary" @click="addUser">新增</el-button>
      </div>
    </div>

    <!--表格-->
    <el-table
      class="w-full"
      ref="multipleTable"
      :data="tableDataShow"
      border
      style="width: 100%"
      @selection-change="handleSelectItem"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="name" label="姓名" />
      <el-table-column prop="email" label="電子信箱" />
      <el-table-column prop="phone" label="電話" />

      <!-- 操作 -->
      <el-table-column align="center" label="操作" :width="120">
        <template v-slot="scope">
          <div class="flex justify-center space-x-[5px]">
            <el-button
              size="small"
              plain
              :underline="false"
              type="danger"
              @click="deleteUser(scope.row)"
            >
              刪除
            </el-button>
            <el-button
              size="small"
              plain
              :underline="false"
              type="primary"
              @click="editUser(scope.row)"
              >編輯</el-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>

    <!--分頁器-->
    <div class="mt-[20px] flex items-center justify-end space-x-[15px]">
      <el-config-provider :locale="zhCn">
        <el-pagination
          background
          layout="total, sizes, prev, pager, next"
          @size-change="handleSizeChange"
          v-model:current-page="currentPage"
          v-model::page-size="pageSize"
          :page-sizes="[10, 20]"
          :total="tableData.length"
        >
        </el-pagination>
      </el-config-provider>
    </div>

    <!-- 新增對話框 -->
    <el-dialog v-model="addDataDialogVisible" :title="dialogTitle" width="500">
      <span>
        <el-form :model="userForm" label-width="80" class="demo-form-inline">
          <el-form-item label="姓名">
            <el-input v-model="userForm.name" placeholder="請輸入內容" clearable />
          </el-form-item>
          <el-form-item label="電子信箱">
            <el-input v-model="userForm.email" placeholder="請輸入內容" clearable />
          </el-form-item>
          <el-form-item label="電話">
            <el-input v-model="userForm.phone" placeholder="請輸入內容" clearable />
          </el-form-item>
        </el-form>
      </span>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="addDataDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="addOrEditSure()">確認</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<style lang="scss" scoped>
:deep(.el-table) {
  .el-table__inner-wrapper {
    font-size: 16px;
    color: black;
  }
  thead th {
    color: black;
    font-weight: 400;
  }
}
</style>
