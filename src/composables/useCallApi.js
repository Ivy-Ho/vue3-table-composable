import to from 'await-to-js'
import { ElMessage } from 'element-plus'

// 使用方式:
// import { useCallApi } from '@/composables/useCallApi.js'
// const { callApi } = useCallApi()
// await callApi({
//   actionFn: () => apiPostElectricBillImport(formData),
//   msg: { success: '更新成功！', failed: '更新失敗！' },
//   callBack: (res) => {
//     billsData.value = res.data
//   }
// })

export function useCallApi() {
  const callApi = async ({ actionFn, msg, callBack }) => {
    const [err, res] = await to(actionFn())
    const isSuccess = 200 <= res?.status <= 299
    if (err || !isSuccess) {
      console.error(err)
      msg?.failed && ElMessage({ type: 'error', message: msg.failed })
      return
    }

    msg?.success && ElMessage({ type: 'success', message: msg.success })
    if (typeof callBack === 'function') {
      await callBack(res)
    }
  }

  return { callApi }
}
