import React, { useEffect, useState } from "react";
import {
    Dialog, DialogTitle, DialogContent, DialogActions, Divider, TextField, Slide
} from "@mui/material";
import { PiNotepad, PiXLight } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../redux/action/user";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const   EditClientModal = ({ open, setOpen,client }) => {
    const dispatch = useDispatch();
    const { currentUser, isFetching } = useSelector((state) => state.user);

    const initialClientState = {
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        phone: "",
    };

    const [clientData, setClientData] = useState(client);

    useEffect(() => {
        setClientData(client);
    }, [client]);

    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange = (field, value) => {
        setClientData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!client) return;
        dispatch(updateUser(client._id, clientData, "client"));
        setOpen(false);
    };


    return (
        <Dialog
            scroll="paper"
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle className="flex items-center justify-between">
                <div className="text-sky-400 font-primary">Edit Client</div>
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
                        {["firstName", "lastName", "username", "email", "phone"].map((field) => (
                            <tr key={field}>
                                <td className="pb-4 text-lg capitalize">{field.replace(/([A-Z])/g, ' $1')}</td>
                                <td className="pb-4">
                                    <TextField
                                        size="small"
                                        fullWidth
                                        type={field === "phone" ? "number" : "text"}
                                        value={clientData?.[field] || ""}
                                        onChange={(e) => handleInputChange(field, e.target.value)}
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

export default EditClientModal;
