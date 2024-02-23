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
  const dialogTitle = ref('')
  const isEdit = ref(false)

  const handleAddData = () => {
    dialogTitle.value = '新增使用者'
    isEdit.value = false
    addDataDialogVisible.value = true
  }

  const handleEditData = () => {
    dialogTitle.value = '編輯使用者'
    isEdit.value = true
    addDataDialogVisible.value = true
  }

  const postTableData = async (postData) => {
    await callApi({
      actionFn: () => apiPostData(postData),
      callBack: () => {
        fetchTableData()
        addDataDialogVisible.value = false
      }
    })
  }

  const putTableData = async (postData) => {
    await callApi({
      actionFn: () => apiPutTableData(currentEditId.value, postData),
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
      callBack: () => {
        fetchTableData()
      }
    })
  }

  const handleDeleteData = () => {
    const fn = () => {
      deleteTableData()
    }
    Swal2.showWaringConfirmMsg('刪除', '是否確定刪除此項目?', '刪除', fn)
  }

  const selected_item = ref([])
  const handleSelectItem = (obj) => {
    selected_item.value = obj
  }

  return {
    tableData,
    tableDataShow,
    currentPage,
    pageSize,
    handleSizeChange,
    handleAddData,
    addDataDialogVisible,
    dialogTitle,
    addOrEditSure,
    handleEditData,
    handleDeleteData,
    handleSelectItem
  }
}
