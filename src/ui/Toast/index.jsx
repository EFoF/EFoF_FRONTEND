import { toast } from "react-toastify";

const toastMsg = (msg, IsSuccessed) =>
    toast(IsSuccessed ? `${msg} 👌` : `${msg} 🤯`, {
        hideProgressBar: true,
        autoClose: 1000,
        draggable: false,
        theme: "dark",
    });

export default toastMsg;
