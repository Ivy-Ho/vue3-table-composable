import Swal from 'sweetalert2'

export const Swal2 = {
  showErrorMsg: function (title, text) {
    Swal.fire({
      icon: 'error',
      title: title,
      text: text,
      showConfirmButton: true,
      confirmButtonText: 'Confirm',
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
  showWaringConfirmMsg: function (title, text, confirmButtonText, fnc) {
    Swal.fire({
      title: title,
      text: text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#F53F3F',
      cancelButtonColor: '#165DFF',
      confirmButtonText: confirmButtonText,
      cancelButtonText: 'Cancel',
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
  }
}
