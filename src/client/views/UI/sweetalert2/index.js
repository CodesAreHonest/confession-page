import Swal from 'sweetalert2';

export const loading = (title) => {

    Swal.fire({
        title: title,
        position: 'center',
        showConfirmButton: false,
        showCancelButton: false,
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        onBeforeOpen: () => {
            Swal.showLoading();
        },
    })

};

export const toastLoading = () => {

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000
    });

    Toast.fire({
        title: 'Submitting',
        onBeforeOpen: () => {
            Swal.showLoading();
        }
    })
};

export const success = (title = '', text = '') => {

    Swal.fire({
        position: 'center',
        showConfirmButton: false,
        timer: 3000,
        type: 'success',
        title,
        text
    });

};

export const toastSuccess = () => {

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000
    });

    Toast.fire({
        title: 'Success',
        type: 'success',
    })
};


export const error = (title = '', text = '') => {

    Swal.fire({
        position: 'center',
        showConfirmButton: false,
        timer: 3000,
        type: 'error',
        title,
        text
    });

};

export const toastError = () => {

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000
    });

    Toast.fire({
        title: 'Error Occurs',
        type: 'error',
    })
};

export const customToastError = (title) => {

    const Toast = Swal.mixin({
        toast: true,
        position: 'center',
        showConfirmButton: false,
        timer: 2000
    });

    Toast.fire({
        title: title,
        type: 'error'
    })
};

export const confirmation = (title = '', text = '') => {

    return new Promise ((resolve) => {

        Swal.fire({
            type: 'warning',
            title,
            text,
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: true,
            showConfirmButton: true,
            showCancelButton: true,
            showCloseButton: true,
            confirmButtonText: 'Submit',
            cancelButtonText: 'Cancel',
            confirmButtonColor: '#5cb85c',
            reverseButtons: true
        }).then(response => {

            if (response.value) {
                return resolve(true);
            }
            else if (response.dismiss === Swal.DismissReason.cancel) {
                return resolve(false);
            }

        }).catch ()

    });

};