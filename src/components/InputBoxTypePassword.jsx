import { useEffect, useState } from "react"
import { FaEye, FaEyeSlash } from "react-icons/fa"

const InputBoxTypePassword = ({ placeholder, name }) => {

    const [visible, setVisible] = useState(false)

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    return (
        <div className="relative w-[80%] lg:w-full max-w-full  lg:max-w-[500px]">
            <input
                type={visible ? "text" : "password"}
                className="w-full lg:w-full px-4 py-4 border-[#2E3238] pr-10 bg-[#1F2328] focus:bg-#1F2328"
                placeholder={placeholder}
                name={name}
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2" onClick={toggleVisibility}>
                {
                    visible ? <FaEye
                        className="text-gray-500 pointer-events-none"
                        size={20}
                    /> : <FaEyeSlash
                        className="text-gray-500 pointer-events-none"
                        size={20}
                    />
                }
            </span>
        </div>
    )
}

export default InputBoxTypePassword