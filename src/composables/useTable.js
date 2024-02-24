import { ref, onMounted, computed } from 'vue'

import { Swal2 } from '@/utils/sweetalert2.js'

import { useCallApi } from '@/composables/useCallApi.js'
const { callApi } = useCallApi()

export function useTable(
  apiGetData,
  formData,
  apiPostData,
  apiPutTableData,
  currentEditId,
  apiDeleteTableData
) {
  const tableData = ref([])

  const currentPage = ref(1)
  const pageSize = ref(10)

  const tableDataShow = computed(() => {
    return tableData.value.slice(
      (currentPage.value - 1) * pageSize.value,
      currentPage.value * pageSize.value
    )
  })

  const fetchTableData = async () => {
    await callApi({
      actionFn: apiGetData,
      callBack: (res) => {
        tableData.value = res.data
      }
    })
  }

  onMounted(() => {
    fetchTableData()
  })

  const handleSizeChange = (val) => {
    pageSize.value = val
  }

  const addDataDialogVisible = ref(false)

  const isEdit = ref(false)

  const handleAddData = () => {
    isEdit.value = false
    addDataDialogVisible.value = true
  }

  const handleEditData = () => {
    isEdit.value = true
    addDataDialogVisible.value = true
  }

  const postTableData = async (postData) => {
    await callApi({
      actionFn: () => apiPostData(postData),
      msg: { success: 'Update Successful！', failed: 'Update Failed！' },
      callBack: () => {
        fetchTableData()
        addDataDialogVisible.value = false
      }
    })
  }

  const putTableData = async (postData) => {
    await callApi({
      actionFn: () => apiPutTableData(currentEditId.value, postData),
      msg: { success: 'Update Successful！', failed: 'Update Failed！' },
      callBack: () => {
        fetchTableData()
        addDataDialogVisible.value = false
      }
    })
  }

  const addOrEditSure = () => {
    const postData = { ...formData.value }
    if (isEdit.value) {
      putTableData(postData)
    } else {
      postTableData(postData)
    }
  }

  const deleteTableData = async () => {
    await callApi({
      actionFn: () => apiDeleteTableData(currentEditId.value),
      msg: { success: 'Delete Successful！', failed: 'Delete Failed！' },
      callBack: () => {
        fetchTableData()
      }
    })
  }

  const handleDeleteData = () => {
    const fn = () => {
      deleteTableData()
    }
    Swal2.showWaringConfirmMsg('Delete', 'Are you sure you want to delete this item?', 'Delete', fn)
  }

  return {
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
  }
}
