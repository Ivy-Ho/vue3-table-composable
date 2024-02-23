<script setup>
// import { useTableStore } from '@/stores/table'
// const tableStore = useTableStore()

import { apiGetUsers, apiPostUsers, apiPutUsers, apiDeleteUsers } from '@/api'

import { useCallApi } from '@/composables/useCallApi.js'
const { callApi } = useCallApi()

import { Swal2 } from '@/utils/sweetalert2.js'

import { ref, computed, onMounted } from 'vue'

import {} from '@/composables/table.js'

// 修改分頁器文字為中文
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
zhCn.el.pagination.total = '共' + `{total}` + '筆'
zhCn.el.pagination.pagesize = '筆/頁'

// 分頁
const currentPage = ref(1) // 當前頁碼
const pageSize = ref(10) // 每頁顯示的數據條數

const handleSizeChange = (val) => {
  pageSize.value = val
}

const usersDataShow = computed(() => {
  return users_data.value.slice(
    (currentPage.value - 1) * pageSize.value,
    currentPage.value * pageSize.value
  )
})

// 表格
const selected_item = ref([])
const handleSelectItem = (obj) => {
  selected_item.value = obj
}

const users_data = ref([])

const fetchUsersData = async () => {
  await callApi({
    actionFn: () => apiGetUsers(),
    callBack: (res) => {
      users_data.value = res.data
    }
  })
}

onMounted(async () => {
  fetchUsersData()
})

// 新增、編輯對話框
const addUserDialogVisible = ref(false)
const dialogTitle = ref('')
const isEdit = ref(false)

const userForm = ref({
  name: '',
  email: '',
  phone: ''
})

const handleAddUser = () => {
  dialogTitle.value = '新增使用者'
  userForm.value = {
    name: '',
    email: '',
    phone: ''
  }
  isEdit.value = false
  addUserDialogVisible.value = true
}

const handleEditUser = (row) => {
  dialogTitle.value = '編輯使用者'
  userForm.value = {
    id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone
  }
  isEdit.value = true
  addUserDialogVisible.value = true
}

const postUserData = async (postData) => {
  await callApi({
    actionFn: () => apiPostUsers(postData),
    callBack: () => {
      fetchUsersData()
      addUserDialogVisible.value = false
    }
  })
}

const putUserData = async (id, postData) => {
  await callApi({
    actionFn: () => apiPutUsers(id, postData),
    callBack: () => {
      fetchUsersData()
      addUserDialogVisible.value = false
    }
  })
}

const addOrEditSure = () => {
  const postData = { ...userForm.value }
  console.log(postData)
  if (isEdit.value) {
    putUserData(userForm.value.id, postData)
  } else {
    postUserData(postData)
  }
}

// 刪除
const handleDeleteUser = (row) => {
  const fn = () => {
    deleteUserData(row.id)
  }
  Swal2.showWaringConfirmMsg('刪除', '是否確定刪除此項目?', '刪除', fn)
}

const deleteUserData = async (id) => {
  await callApi({
    actionFn: () => apiDeleteUsers(id),
    callBack: () => {
      fetchUsersData()
    }
  })
}
</script>

<template>
  <div>
    <div class="mb-[20px] flex justify-end">
      <!--按鈕-->
      <div class="flex items-center space-x-[12px]">
        <!-- <el-button type="info" plain @click="deleteSelectEui()">批次刪除</el-button>
        <el-button type="info" plain @click="exportData()">匯出</el-button>
        <el-button type="info" plain @click="dialogImportVisible = true">匯入</el-button> -->
        <el-button type="primary" @click="handleAddUser">新增</el-button>
      </div>
    </div>

    <!--表格-->
    <el-table
      class="w-full"
      ref="multipleTable"
      :data="usersDataShow"
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
            <el-link :underline="false" type="danger" @click="handleDeleteUser(scope.row)">
              刪除
            </el-link>
            <el-link :underline="false" type="primary" @click="handleEditUser(scope.row)"
              >編輯</el-link
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
          :total="users_data.length"
        >
        </el-pagination>
      </el-config-provider>
    </div>

    <!-- 新增對話框 -->
    <el-dialog v-model="addUserDialogVisible" :title="dialogTitle" width="500">
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
          <el-button @click="addUserDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="addOrEditSure">確認</el-button>
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
