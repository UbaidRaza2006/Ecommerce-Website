



export default function InputComponent({label, onChange, value, type, placeholder}) {

    return(
        <div className="relative">
            <p className="pt-0 pr-2 pb-0 pl-2 mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600">{label}</p>
            <input
            placeholder={placeholder}
            type={type || "text"}
            value={value}
            onChange={onChange}
            className="border focus:outline-none focus:border-black w-full placeholder-gray-400 text-base block bg-white pt-4 pr-4 pb-4 pl-4 mt-0 mr-0 ml-0 border-gary-300 rounded-md"
            />
        </div>
    )
}
