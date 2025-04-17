import { useContext } from "react";
import { assets } from "../../assets/assets";
import "./ItemForm.css";
import { AppContext } from "../../context/AppContext";
import { useState } from "react";
import { addItem } from "../../Service/ItemService";
import toast from "react-hot-toast";
const ItemForm = () => {

    const {categories,setCategories,itemsData,setItemsData,loadCategories} = useContext(AppContext);

    const [image, setImage] = useState(false);

    const [data, setData] = useState({
        name:"",
        categoryId:"",
        price:"",
        description:"",
    });

    const onChangeHandler = (e) =>{
        const value = e.target.value;
        const name = e.target.name;
        setData((data)=>({...data,[name]:value}));
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        
        if(!image){
            toast.error("Select image for category");
            return;
        }
        const formData = new FormData();
        formData.append("item",JSON.stringify(data));
        formData.append("file",image);

        try{
            const response = await addItem(formData);
            if(response.status===201){
                setItemsData([...itemsData,response.data]);
                setCategories((prev)=>prev.map((category)=>category.categoryId===data.categoryId?{...category,items:category.item+1}:category));
                toast.success("Item added succesfully")
                setData({
                    name:"",
                    categoryId:"",
                    price:"",
                    description:"",
                });
                setImage(false);
                await loadCategories();
            }
            else{
                toast.error("Something went wrong");
            }
        }
        catch(error){
            console.log(error);
            toast.error("Something went wrong");
        }
    }

  return (
    <div className="item-form-container" style={{height:`100vh`, overflowY:`auto`, overflowX:`hidden`}}>
        <div className="mx-2 mt-2">
        <div className="row">
            <div className="card col-md-12 form-container">
                <div className="card-bpdy">
                    <form onSubmit={onSubmitHandler}>
                        <div className="mb-3">
                            <label htmlFor="image">Image upload
                            <br/>
                            <img
                                src={image ? URL.createObjectURL(image) : assets.upload}
                                alt="img"
                                className="pt-3"
                                style={{ cursor: "pointer" }}
                                height={80}
                                width={70}
                                />
                            </label>
                            <input type="file" name="image" id="image" className="form-control" onChange={(e)=>setImage(e.target.files[0])}  hidden required></input>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input type="text"
                            name="name"
                            id="name"
                            className="form-control"
                            placeholder="Item Name"
                            onChange={onChangeHandler}
                            value={data.name}
                            required
                            ></input>
                        </div>
                        
                        <div className="mb-3">
                            <label className="form-label" htmlFor="category">
                                Category
                            </label>
                            <select name="categoryId" id="categoryId" className="form-control" onChange={onChangeHandler}
                            value={data.categoryId}>
                                <option value="">--SELECT CATEGORY--</option>
                                {categories.map((category,index)=>(
                                    <option key={index} value={category.categoryId}>{category.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="price" className="form-label">Price</label>
                            <input type="number" name="price" onChange={onChangeHandler}
                            value={data.price} id="price" className="form-control" placeholder="&#8377;200.00" required></input>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description</label>
                            <textarea
                            rows={2.5}
                            name="description"
                            id="description"
                            className="form-control"
                            placeholder="Write content here..."
                            onChange={onChangeHandler}
                            value={data.description}
                            ></textarea>
                        </div>
                        <button type="submit" className="btn btn-warning w-100 mb-2">Save</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
    </div>
  )
}

export default ItemForm