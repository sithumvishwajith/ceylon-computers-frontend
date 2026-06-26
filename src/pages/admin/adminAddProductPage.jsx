import { useState } from "react"
import toast from "react-hot-toast";
import uploadMedia from "../../utils/mediaUpload";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AdminAddProductPage(){

    const[productId,setProductId] = useState("");
    const[name,setName] = useState("");
    const[altNames,setAltNames] = useState("");
    const[price,setPrice] = useState("");
    const[labelPrice,setLabelPrice] = useState("");
    const[description,setDescription] = useState("");
    const[images,setImages] = useState([]);
    const[brand,setBrand] = useState("");
    const[model,setModel] = useState("");
    const[category,setCategory] = useState("");
    const[isAvailable,setIsAvailable] = useState(true);
    const[stock,setStock] = useState(0);

    const navigate = useNavigate()

    async function handleSave(){
        try{
            const token = localStorage.getItem("token");
            if(token == null){
                toast.error("You must be logged in to perform this action.");
                window.location.href = "/login";
                return;
            }

            const mediaUploadPromises = []

            for(let i=0; i < images.length; i++){
                mediaUploadPromises.push(uploadMedia(images[i]));
            }

            const urls = await Promise.all(mediaUploadPromises);
            const altNamesArray = altNames.split(",")

            const productData = {
                productId,
                name,
                altNames : altNamesArray,
                price,
                labelPrice,
                description,
                images : urls,
                brand,
                model,
                category,
                isAvailable,
                stock
            }

            await axios.post(import.meta.env.VITE_API_URL + "/products",productData,
                {
                    headers : {
                        "Authorization" : "Bearer " + token
                    }
                }
            )

            toast.success("Product added successfully!");
            navigate("/admin/products")


        }
        catch(error){
            toast.error(error?.response?.data?.message || "Failed to add product. Please try again.")
        }
    }

    return(
        <div className="w-full h-full flex flex-col items-center p-4 overflow-y-scroll">
            <div className="sticky top-0 w-full h-[100px] rounded-lg bg-secondary text-white shadow-2xl flex items-center justify-between p-5">
                <h1 className="text-2xl font-semibold">Add New Product</h1>
                <div className="h-full flex justify-center items-center">
                    <button onClick={handleSave} className="px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-700">Save</button>
                    <button onClick={()=>{navigate("/admin/products")}} className="ml-4 px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-700">Cancel</button>
                </div>
            </div>

            <div className="w-full flex flex-wrap bg-white shadow-2xl mt-8 p-5 rounded-lg">
                <div className="w-1/4 p-2">
                    <label className="block mb-2 font-semibold">Product ID</label>
                    <input
                    onChange={
                            (e)=>{
                                setProductId(e.target.value)
                            }
                        }
                    value={productId}
                    className="border border-gray-300 rounded-md p-2 w-full"/>
                </div>

                <div className="w-3/4 p-2">
                    <label className="block mb-2 font-semibold">Name</label>
                    <input
                    onChange={
                            (e)=>{
                                setName(e.target.value)
                            }
                        }
                    value={name}
                    className="border border-gray-300 rounded-md p-2 w-full"/>
                </div>

                <div className="w-full p-2">
                    <label className="block mb-2 font-semibold">Alternative Names (comma separated)</label>
                    <input
                    onChange={
                            (e)=>{
                                setAltNames(e.target.value)
                            }
                        }
                    value={altNames}
                    className="border border-gray-300 rounded-md p-2 w-full"/>
                </div>

                <div className="w-1/4 p-2">
                    <label className="block mb-2 font-semibold">Price</label>
                    <input
                    onChange={
                            (e)=>{
                                setPrice(e.target.value)
                            }
                        }
                    value={price}
                    className="border border-gray-300 rounded-md p-2 w-full"/>
                </div>

                <div className="w-1/4 p-2">
                    <label className="block mb-2 font-semibold">Labelled Price</label>
                    <input
                    onChange={
                            (e)=>{
                                setLabelPrice(e.target.value)
                            }
                        }
                    value={labelPrice}
                    className="border border-gray-300 rounded-md p-2 w-full"/>
                </div>

                <div className="w-1/4 p-2">
                    <label className="block mb-2 font-semibold">Category</label>
                    <select
                    onChange={
                        (e)=>{
                            setCategory(e.target.value)
                        }
                    }
                    value={category}
                    className="border border-gray-300 rounded-md p-2 w-full">
                        <option value="Laptop">Laptop</option>
                        <option value="Mobile">Mobile</option>
                        <option value="Headphones">Headphones</option>
                        <option value="Camera">Camera</option>
                        <option value="Graphic Card">Graphic Card</option>
                        <option value="Processor">Processor</option>
                        <option value="SSD">SSD</option>
                        <option value="Monitor">Monitor</option>
                        <option value="Printer">Printer</option>
                        <option value="Others">Others</option>
                    </select>
                </div>

                <div className="w-1/4 p-2">
                    <label className="block mb-2 font-semibold">Images</label>
                    <input
                    onChange={
                        (e)=>{
                            setImages(e.target.files)
                        }
                    } 
                    type="file" multiple
                    className="border border-gray-300 rounded-md p-2 w-full"/>
                </div>

                <div className="w-full p-2">
                    <label className="block mb-2 font-semibold">Description</label>
                    <textarea
                    onChange={
                            (e)=>{
                                setDescription(e.target.value)
                            }
                        }
                    value={description}
                    className="border border-gray-300 rounded-md p-2 w-full"/>
                </div>

                <div className="w-1/4 p-2">
                    <label className="block mb-2 font-semibold">Brand</label>
                    <select
                    onChange={
                        (e)=>{
                            setBrand(e.target.value)
                        }
                    }
                    value={brand}
                    className="border border-gray-300 rounded-md p-2 w-full">
                        <option value="Apple">Apple</option>
                        <option value="Samsung">Samsung</option>
                        <option value="Sony">Sony</option>
                        <option value="Dell">Dell</option>
                        <option value="HP">HP</option>
                        <option value="Lenovo">Lenovo</option>
                        <option value="Asus">Asus</option>
                        <option value="Acer">Acer</option>
                        <option value="Nvidia">Nvidia</option>
                        <option value="AMD">AMD</option>
                        <option value="Others">Others</option>
                    </select>
                </div>

                <div className="w-1/4 p-2">
                    <label className="block mb-2 font-semibold">Model</label>
                    <input
                    onChange={
                            (e)=>{
                                setModel(e.target.value)
                            }
                        }
                    value={model}
                    className="border border-gray-300 rounded-md p-2 w-full"/>
                </div>

                <div className="w-1/4 p-2">
                    <label className="block mb-2 font-semibold">Stock</label>
                    <input
                    onChange={
                            (e)=>{
                                setStock(e.target.value)
                            }
                        }
                    value={stock}
                    className="border border-gray-300 rounded-md p-2 w-full"/>
                </div>

                <div className="w-1/4 p-2">
                    <label className="block mb-2 font-semibold">Availability</label>
                    <select
                    onChange={
                        (e)=>{
                            setIsAvailable(e.target.value)
                        }
                    }
                    value={isAvailable}
                    className="border border-gray-300 rounded-md p-2 w-full">
                        <option value="true" className="bg-green-600 text-white font-semibold">Available</option>
                        <option value="false" className="bg-red-600 text-white font-semibold">Not Available</option>
                    </select>
                </div>
                
            </div>

        </div>
    )
}