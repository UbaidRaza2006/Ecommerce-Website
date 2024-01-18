'use client'

import InputComponent from "@/components/FormElements/InputComponent";
import SelectComponent from "@/components/FormElements/SelectComponent";
import TileComponent from "@/components/FormElements/TileComponent/page"
import { addNewProduct } from "@/services/product";
import {
    AvailableSizes,
    adminAddProductformControls,
    firebaseConfig,
    firebaseStorageURL,
} from "@/utils";
import { initializeApp } from 'firebase/app'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { useState } from "react";

const app = initializeApp(firebaseConfig);
const storage = getStorage(app, firebaseStorageURL)


const createUniqueFileName = (getFile) => {
    const timeStamp = Date.now();

    const randomStringValue = Math.random().toString(36).substring(2, 16)
    return `${getFile.name}-${timeStamp}-${randomStringValue}`

}

async function helperForUploadingImageToFirebase(file) {

    const getFileName = createUniqueFileName(file);

    const storageRefrence = ref(storage, `ecommerce/${getFileName}`);
    const uploadImage = uploadBytesResumable(storageRefrence, file)



    return new Promise((resolve, reject) => {
        uploadImage.on('state_changed', (snapshot) => { }, (error) => {
            console.log(error);
            reject(error)
        }, () => {
            getDownloadURL(uploadImage.snapshot.ref).then(downloadUrl => resolve(downloadUrl)).catch(error => reject(error))
        }
        )

    })


}


const initialFormData = {
    name: '',
    price: 0,
    description: '',
    category: "men",
    sizes: [],
    deliverInfo: '',
    onSale: 'no',
    imageUrl: '',
    priceDrop: 0
}




export default function adminAddNewProduct() {

    const [formData, setFormData] = useState(initialFormData)


    async function handleImage(event) {
        console.log(event.target.files);

        const extractImageUrl = await helperForUploadingImageToFirebase(event.target.files[0])

        console.log(extractImageUrl);

        if (extractImageUrl) {
            setFormData({
                ...formData,
                imageUrl: extractImageUrl
            })

        }
    }


    function handleTileClick(getCurrentItem) {
        console.log(getCurrentItem);

        let cpySizes = [...formData.sizes]
        const index = cpySizes.findIndex((item) => item.id === getCurrentItem.id)

        if (index === '-1') {
            cpySizes.push(getCurrentItem)
        } 
        else {
            cpySizes.filter((item) => item.id !== getCurrentItem.id)
        }

        setFormData({
            ...formData,
            sizes: cpySizes,
        })


    }

async function handleAddProduct(){
    const res=await addNewProduct(formData);
    console.log(res);
}


    console.log(formData);
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
                        <TileComponent selected={formData.sizes} onClick={handleTileClick}
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
                        onClick={handleAddProduct} 
                        className="inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg text-white font-medium uppercase tracking-wide"
                    >Add Product</button>
                </div>
            </div>
        </div>
    )
}