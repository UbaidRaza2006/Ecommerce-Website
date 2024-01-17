'use client'

import InputComponent from "@/components/FormElements/InputComponent";
import SelectComponent from "@/components/FormElements/SelectComponent";
import TileComponent from "@/components/FormElements/TileComponent/page"
import {
    AvailableSizes,
    adminAddProductformControls,
    firebaseConfig,
    firebaseStroageURL,
} from "@/utils";



export default function AdminAddNewProduct() {
    function handleImage() {

    }
    return (
        <div className="w-full mt-5 mr-0 mb-0 ml-0 relative">
            <div className="flex flex-col items-start justify-start p-10 bg-white shadow-2xl rounded-xl relative">
                <div className="w-full mt-6 mr-0 mb-0 ml-0 space-y-8">

                    <input
                        accept="image/*"
                        onChange={handleImage}
                        max="1000000"
                        type="file"
                    />

                    <div className="flex gap-2 flex-col">
                        <label>Available Sizes</label>
                        <TileComponent
                            data={AvailableSizes} />
                    </div>
                    {adminAddProductformControls.map((controlItem) =>
                        controlItem.componentType === "input" ? (
                            <InputComponent
                                type={controlItem.type}
                                placeholder={controlItem.placeholder}
                                label={controlItem.label}
                                value={formData[controlItem.id]}
                                onChange={(event) => {
                                    setFormData({
                                        ...formData,
                                        [controlItem.id]: event.target.value,
                                    });
                                }}
                            />
                        ) : controlItem.componentType === "select" ? (
                            <SelectComponent
                                label={controlItem.label}
                                options={controlItem.options}
                                value={formData[controlItem.id]}
                                onChange={(event) => {
                                    setFormData({
                                        ...formData,
                                        [controlItem.id]: event.target.value,
                                    });
                                }}
                            />
                        ) : null
                    )}
                    <button
                        // onClick={handleAddProduct}
                        className="inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg text-white font-medium uppercase tracking-wide"
                    ></button>
                </div>
            </div>
        </div>
    )
}