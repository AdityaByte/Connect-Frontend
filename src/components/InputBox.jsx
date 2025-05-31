import { FaUser } from "react-icons/fa"

const InputBox = ({ placeholder, type, name }) => {
    return (
        <div className="relative w-full max-w-[500px]">
            <input
                type={type}
                className="w-full px-4 py-4 border-[#2E3238] pr-10 bg-[#1F2328] focus:bg-#1F2328"
                placeholder={placeholder}
                name={name}
            />
            <FaUser
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"
                size={20}
            />
        </div>
    )
}

export default InputBox