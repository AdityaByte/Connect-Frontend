import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addRoom } from "../feature/room/manageRoom";

const AddRoomWindow = ({ closeWindow }) => {

    const roomName = useRef(null)
    const roomDesc = useRef(null)
    const dispatch = useDispatch()
    const backendURL = import.meta.env.VITE_BACKEND_URL

    const handleNewRoomRequest = async (e) => {
        e.preventDefault()
        let name = roomName.current.value.trim()
        let desc = roomDesc.current.value.trim()
        if (name === "" || desc === "") {
            toast.error("Value can't be empty");
            return;
        } else if (name.length < 4 || name.length > 15) {
            toast.error("Length of the room name should be under 4 to 15 chars")
            return;
        } else if (desc.length > 250) {
            console.log(desc)
            console.log(desc.length)
            toast.error("Description should not be greater than 100 chars")
            return;
        }
        await fetch(`${backendURL}/room/create`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "roomName": name,
                "roomDescription": desc,
                "timeStamp": new Date()
            })
        })
            .then(async response => {
                const data = await response.json()
                if (response.status != 201) {
                    throw new Error(data.response)
                }
                // Here we need to change the state of the rooms also.
                dispatch(addRoom({
                    roomId: data.response,
                    roomName: name,
                    roomDescription: desc
                }))
                closeWindow()
            })
            .catch(async error => {
                console.error(error.message)
                toast.error(error.message)
            })
    }

    return (
        <div className="absolute w-full h-full bg-[#1C1F24]/60 flex justify-center items-center transition-all" onClick={closeWindow}>
            <form onSubmit={handleNewRoomRequest} onClick={(e) => e.stopPropagation()} className="bg-[#FFFFFF1A] backdrop-blur-md h-[70vh] lg:h-[80vh] w-[90vw] lg:w-[70vw] rounded flex flex-col items-center justify-evenly py-3 text-gray-100 px-2 lg:px-10">
                <h1 className="font-bold text-[1.5rem]">Add Room</h1>
                <InputBox value={roomName} placeholder={"Room Name"} />
                <TextArea value={roomDesc} placeholder={"Room Description.."} />
                <button className="w-full px-4 py-2 bg-[#1C1F24] hover:bg-green-700 active:bg-green-900 text-white rounded font-bold">Create Room</button>
            </form>
        </div>
    )
}

const InputBox = ({ placeholder, value }) => {
    return (
        <input ref={value} className="w-full bg-[#262A30] text-white-500 rounded px-4 py-2" placeholder={placeholder} required />
    )
}

const TextArea = ({ placeholder, value }) => {
    return (
        <textarea ref={value} className="w-full h-[40%] bg-[#262A30] text-white-900 rounded px-4 py-2" placeholder={placeholder} required></textarea>
    )
}

export default AddRoomWindow