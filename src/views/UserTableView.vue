s
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
  handleDeleteData
  // handleSelectItem
} = useTable(apiGetUsers, userForm, apiPostUsers, apiPutUsers, currentEditId, apiDeleteUsers)

const dialogTitle = ref('')

const addUser = () => {
  dialogTitle.value = 'Add User'
  userForm.value = {
    name: '',
    email: '',
    phone: ''
  }
  handleAddData()
}

const editUser = (row) => {
  dialogTitle.value = 'Edit User'
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
  <div class="p-10">
    <div class="mb-[20px] flex justify-end">
      <div class="flex items-center space-x-[12px]">
        <el-button type="primary" @click="addUser">Add</el-button>
      </div>
    </div>

    <!--table-->
    <el-table class="w-full" ref="multipleTable" :data="tableDataShow" border style="width: 100%">
      <el-table-column align="center" prop="name" label="User Name" />
      <el-table-column align="center" prop="email" label="User Email" />
      <el-table-column align="center" prop="phone" label="User Tel" />

      <!-- operate -->
      <el-table-column align="center" label="Operate" :width="160">
        <template v-slot="scope">
          <div class="flex justify-center space-x-[5px]">
            <el-button
              size="small"
              plain
              :underline="false"
              type="danger"
              @click="deleteUser(scope.row)"
            >
              Delete
            </el-button>
            <el-button
              size="small"
              plain
              :underline="false"
              type="primary"
              @click="editUser(scope.row)"
              >Edit</el-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>

    <!--pagination-->
    <div class="mt-[20px] flex items-center justify-end space-x-[15px]">
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
    </div>

    <!-- dialog -->
    <el-dialog v-model="addDataDialogVisible" :title="dialogTitle" width="500">
      <span>
        <el-form :model="userForm" label-width="120" class="demo-form-inline">
          <el-form-item label="User Name">
            <el-input v-model="userForm.name" placeholder="Please input" clearable />
          </el-form-item>
          <el-form-item label="User Email">
            <el-input v-model="userForm.email" placeholder="Please input" clearable />
          </el-form-item>
          <el-form-item label="User Tel">
            <el-input v-model="userForm.phone" placeholder="Please input" clearable />
          </el-form-item>
        </el-form>
      </span>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="addDataDialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="addOrEditSure()">Confirm</el-button>
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
