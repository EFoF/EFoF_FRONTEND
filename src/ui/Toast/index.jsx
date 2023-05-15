import { toast } from "react-toastify";

const toastMsg = (msg, IsSuccessed) =>
    toast(IsSuccessed ? `${msg} 👌` : `${msg} 🤯`, {
        hideProgressBar: true,
        autoClose: 2500,
        draggable: false,
        theme: "dark",
    });

export default toastMsg;
