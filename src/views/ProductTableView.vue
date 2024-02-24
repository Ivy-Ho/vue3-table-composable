<script setup>
import { apiGetProducts, apiPostProducts, apiPutProducts, apiDeleteProducts } from '@/api'

import { ref, computed } from 'vue'

const productForm = ref({
  item_name: '',
  item_price: 0,
  item_qty: 0,
  has_paid: false
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
} = useTable(
  apiGetProducts,
  productForm,
  apiPostProducts,
  apiPutProducts,
  currentEditId,
  apiDeleteProducts
)

const dialogTitle = ref('')

const addUser = () => {
  dialogTitle.value = 'Add Product'
  productForm.value = {
    item_name: '',
    item_price: 0,
    item_qty: 0,
    has_paid: false
  }
  handleAddData()
}

const editUser = (row) => {
  dialogTitle.value = 'Edit Product'
  productForm.value = {
    id: row.id,
    item_name: row.item_name,
    item_price: row.item_price,
    item_qty: row.item_qty,
    has_paid: row.has_paid
  }
  currentEditId.value = row.id
  handleEditData()
}

const totalInDialog = computed(() => productForm.value.item_price * productForm.value.item_qty)

const deleteProduct = (row) => {
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

    <!--表格-->
    <el-table class="w-full" ref="multipleTable" :data="tableDataShow" border style="width: 100%">
      <el-table-column prop="item_name" align="center" label="Product Name" />
      <el-table-column prop="item_price" align="center" label="Product Price">
        <template #default="scope">
          <p class="text-right">${{ scope.row.item_price.toLocaleString() }}</p>
        </template>
      </el-table-column>
      <el-table-column prop="item_qty" align="center" width="180" label="Product Quantity" />
      <el-table-column label="Total" align="center">
        <template #default="scope">
          <p class="text-right">
            ${{ (scope.row.item_price * scope.row.item_qty).toLocaleString() }}
          </p>
        </template>
      </el-table-column>
      <el-table-column prop="has_paid" align="center" label="Status">
        <template #default="scope">
          <p v-if="scope.row.has_paid" class="text-green-400">Paid</p>
          <p v-else class="text-red-400">Unpaid</p>
        </template>
      </el-table-column>

      <!-- operate -->
      <el-table-column align="center" label="Operate" :width="160">
        <template v-slot="scope">
          <div class="flex justify-center space-x-[5px]">
            <el-button
              size="small"
              plain
              :underline="false"
              type="danger"
              @click="deleteProduct(scope.row)"
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
        <el-form :model="productForm" label-width="150" class="demo-form-inline">
          <el-form-item label="Product Name">
            <el-input v-model="productForm.item_name" placeholder="Please input" clearable />
          </el-form-item>
          <el-form-item label="Product Price">
            <el-input-number v-model="productForm.item_price" :min="0" />
          </el-form-item>
          <el-form-item label="Product Quantity">
            <el-input-number v-model="productForm.item_qty" :min="1" />
          </el-form-item>
          <el-form-item label="Total"> ${{ totalInDialog }} </el-form-item>
          <el-form-item label="Status">
            <el-radio-group v-model="productForm.has_paid" class="ml-4">
              <el-radio :label="true">Paid</el-radio>
              <el-radio :label="false">Unpaid</el-radio>
            </el-radio-group>
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
