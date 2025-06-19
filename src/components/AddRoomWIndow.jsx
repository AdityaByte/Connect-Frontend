import React, { useRef } from "react";
import { toast } from "react-toastify";

const AddRoomWindow = ({closeWindow}) => {

    const roomName = useRef(null)
    const roomDesc = useRef(null)

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
        } else if (desc.length > 100) {
            toast.error("Description should not be greater than 100 chars")
            return;
        }
        // await fetch(`${import.meta.env.VITE_BACKEND_URL}/room/create`, {
        //     method: "POST",
        //     body: {
        //         roomName: name,
        //         roomDesc: desc
        //     }
        // })
        // .then(async response => {

        // })
    }

    return (
        <div className="absolute w-full h-full bg-[#1C1F24]/60 flex justify-center items-center transition-all" onClick={closeWindow}>
            <form onSubmit={handleNewRoomRequest} onClick={(e) => e.stopPropagation()} className="bg-[#FFFFFF1A] backdrop-blur-md h-[85vh] lg:h-[80vh] w-[90vw] lg:w-[70vw] rounded flex flex-col items-center justify-evenly py-3 text-gray-100 px-2 lg:px-10">
                <h1 className="font-bold text-[1.5rem]">Add Room</h1>
                <InputBox value={roomName} placeholder={"Room Name"} />
                <TextArea value={roomDesc} placeholder={"Room Description.."} />
                <button className="w-full px-4 py-2 bg-[#1C1F24] hover:bg-green-700 active:bg-green-900 text-white rounded font-bold">Create Room</button>
            </form>
        </div>
    )
}

const InputBox = ({placeholder, value }) => {
    return (
        <input ref={value} className="w-full bg-[#262A30] text-white-500 rounded px-4 py-2" placeholder={placeholder} required/>
    )
}

const TextArea = ({placeholder, value }) => {
    return (
        <textarea ref={value} className="w-full h-[40%] bg-[#262A30] text-white-900 rounded px-4 py-2" placeholder={placeholder} required></textarea>
    )
}

export default AddRoomWindow