import { options } from "joi";





export default function SelectComponent({ label, onChange, value, options = [], }) {
    return (
        <div>
            <p className="pt-0 pr-2 pb-0 pl-2 mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 bg-white">{label}</p>
            <select
                value={value}
                onChange={onChange}
                className="border focus:outline-none focus:border-black w-full placeholder-gray-400 text-base block bg-white pt-4 pr-4 pb-4 pl-4 mt-0 mr-0 ml-0 border-gary-300 rounded-md"
            >
                {
                    options && options.length ? (options.map((optionItem) => (<option id={optionItem.id} value={optionItem.id} key={optionItem.id}> {optionItem.label}</option>))) : (<option id="" value={''}></option>
                    )}

            </select>
        </div>
    )
}