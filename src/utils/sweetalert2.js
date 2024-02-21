import Swal from 'sweetalert2'

export const Swal2 = {
  // confirm: function (title, callback) {
  //   Swal.fire({
  //     title: title,
  //     icon: 'question',
  //     showCancelButton: true,
  //     confirmButtonText: '確定',
  //     cancelButtonText: '取消',
  //     confirmButtonColor: '#165DFF',
  //     cancelButtonColor: '#9B9B9B',
  //     reverseButtons: true
  //   }).then(async (result) => {
  //     if (result.isConfirmed && callback) {
  //       callback()
  //     }
  //   })
  // },
  showErrorMsg: function (title, text) {
    Swal.fire({
      icon: 'error',
      title: title,
      text: text,
      showConfirmButton: true,
      confirmButtonText: '確定',
      confirmButtonColor: '#165DFF',
      customClass: {
        popup: 'rounded-[15px] w-[340px] pb-[30px]',
        icon: 'mt-[30px] mb-[0]',
        htmlContainer: '!m-[0] !text-[16px] !px-[10px]',
        actions: 'mt-[30px]',
        confirmButton: '!rounded-[47px] w-[280px] !my-[0] !ml-[0] !mr-[15px]'
      }
    })
  },
  // showSuccessMsg: function (title) {
  //   Swal.fire({
  //     icon: 'success',
  //     title: title,
  //     showConfirmButton: false,
  //     timer: 1500
  //   })
  // },
  showWaringMsg: function (title, text) {
    Swal.fire({
      title: title,
      text: text,
      icon: 'warning',
      confirmButtonColor: '#165DFF',
      confirmButtonText: '確定',
      color: '#000000',
      iconColor: '#FF0000',
      customClass: {
        popup: 'rounded-[15px] w-[340px] pb-[30px]',
        icon: 'mt-[30px] mb-[0]',
        title: 'py-[15px] leading-[42px]',
        htmlContainer: '!m-[0] !text-[16px] !px-[10px]',
        actions: 'mt-[30px]',
        confirmButton: '!rounded-[47px] w-[280px] !my-[0] !ml-[0] !mr-[15px]'
      }
    })
  },
  showWaringConfirmMsg: function (title, text, confirmButtonText, fnc) {
    Swal.fire({
      title: title,
      text: text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#F53F3F',
      cancelButtonColor: '#165DFF',
      confirmButtonText: confirmButtonText,
      cancelButtonText: '取消',
      color: '#000000',
      iconColor: '#FF0000',
      customClass: {
        popup: 'rounded-[15px] w-[340px] pb-[30px]',
        icon: 'mt-[30px] mb-[0]',
        title: 'py-[15px] leading-[42px]',
        htmlContainer: '!m-[0] !text-[16px]',
        actions: 'mt-[30px]',
        confirmButton: '!rounded-[47px] w-[132px] !my-[0] !ml-[0] !mr-[15px]',
        cancelButton: '!rounded-[47px] w-[132px] !m-[0]'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        fnc()
      }
    })
  },
  showSuccessConfirmMsg: function (title, confirmButtonText, cancelButtonText, fnc) {
    Swal.fire({
      title: title,
      icon: 'success',
      showCancelButton: true,
      confirmButtonColor: '#165DFF',
      cancelButtonColor: '#F53F3F',
      confirmButtonText: confirmButtonText,
      cancelButtonText: cancelButtonText,
      reverseButtons: true,
      color: '#000000',
      iconColor: '#FF0000',
      customClass: {
        popup: 'rounded-[15px] w-[340px] pb-[30px]',
        icon: 'mt-[30px] mb-[0]',
        title: 'py-[15px] leading-[42px]',
        confirmButton: '!rounded-[47px] w-[132px] !my-[0] !ml-[0] ',
        cancelButton: '!rounded-[47px] w-[132px] !m-[0] !mr-[15px]'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        fnc()
      }
    })
  }
}
