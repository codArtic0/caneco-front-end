import Swal from "sweetalert2";
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

export const showAlert = (title, text) => {
    MySwal.fire({
        title: title,
        text: text,
        icon: 'info',
        confirmButtonText: "OK",
        confirmButtonColor: '#3085d6'
    });
}

export const showSuccessAlert = (title, text) => {
    MySwal.fire({
        title: title,
        text: text,
        icon: 'success',
        confirmButtonText: "OK",
        confirmButtonColor: '#3085d6'
    });
}

export const showErrorAlert = (title, text) => {
    MySwal.fire({
        title: title,
        text: text,
        icon: 'error',
        confirmButtonText: "OK",
        confirmButtonColor: '#3085d6'
    });
}