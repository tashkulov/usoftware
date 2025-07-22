import React, { useState } from "react";
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Divider, TextField, Slide
} from "@mui/material";
import { PiNotepad, PiXLight } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { createClient } from "../../redux/action/user"; // ⚠️ Убедись, что у тебя есть этот экшн

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const CreateClientModal = ({ open, setOpen }) => {
    const dispatch = useDispatch();
    const { isFetching } = useSelector((state) => state.user);

    const initialClientState = {
        firstName: "",
        lastName: "",
        username: "",
        password: "",
        phone: "",
        email: "",
    };

    const [clientData, setClientData] = useState(initialClientState);
    const [errors, setErrors] = useState({});

    const handleChange = (field, value) => {
        setClientData((prev) => ({ ...prev, [field]: value }));
    };

    const handleClose = () => {
        setOpen(false);
        setClientData(initialClientState);
        setErrors({});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { firstName, lastName, username, password, phone } = clientData;
        const newErrors = {};
        if (!firstName) newErrors.firstName = "First name is required";
        if (!lastName) newErrors.lastName = "Last name is required";
        if (!username) newErrors.username = "Username is required";
        if (!password) newErrors.password = "Password is required";
        if (!phone) newErrors.phone = "Phone is required";

        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) return;

        dispatch(createClient(clientData, setOpen));
        setClientData(initialClientState);
        setErrors({});
    };

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle className="flex items-center justify-between">
                <div className="text-sky-400 font-primary">Add New Client</div>
                <div className="cursor-pointer" onClick={handleClose}>
                    <PiXLight className="text-[25px]" />
                </div>
            </DialogTitle>

            <DialogContent>
                <div className="flex flex-col gap-2 p-3 text-gray-500 font-primary">
                    <div className="text-xl flex items-center gap-2 font-normal">
                        <PiNotepad size={23} />
                        <span>Client Details</span>
                    </div>
                    <Divider />
                    <table className="mt-4">
                        {["firstName", "lastName", "username", "email", "password", "phone"].map((field, i) => (
                            <tr key={field}>
                                <td className="pb-4 text-lg capitalize">{field.replace(/([A-Z])/g, ' $1')}</td>
                                <td className="pb-4">
                                    <TextField
                                        size="small"
                                        fullWidth
                                        type={field === "password" ? "password" : field === "phone" ? "number" : "text"}
                                        placeholder={field === "email" ? "Optional" : ""}
                                        value={clientData[field]}
                                        onChange={(e) => handleChange(field, e.target.value)}
                                        error={Boolean(errors[field])}
                                        helperText={errors[field]}
                                    />
                                </td>
                            </tr>
                        ))}
                    </table>
                </div>
            </DialogContent>

            <DialogActions>
                <button
                    onClick={handleClose}
                    className="bg-[#d7d7d7] px-4 py-2 rounded-lg text-gray-500 mt-4 hover:text-white hover:bg-[#6c757d] border-[2px] border-[#efeeee] hover:border-[#d7d7d7] font-thin transition-all"
                >
                    Cancel
                </button>
                <button
                    onClick={handleSubmit}
                    className="bg-primary-red px-4 py-2 rounded-lg text-white mt-4 hover:bg-red-400 font-thin"
                >
                    {isFetching ? "Submitting..." : "Submit"}
                </button>
            </DialogActions>
        </Dialog>
    );
};

export default CreateClientModal;
