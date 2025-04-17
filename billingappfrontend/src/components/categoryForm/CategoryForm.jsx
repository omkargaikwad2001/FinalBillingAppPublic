import { useContext, useEffect, useState } from "react"
import { assets } from '../../assets/assets';
import toast from "react-hot-toast";
import { addCategory } from "../../Service/CategoryService";
import { AppContext } from "../../context/AppContext";
const CategoryForm = () => {

    const {categories, setCategories} = useContext(AppContext);
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(false);

    const [data, setData] = useState({
        name:"",
        description:"",
        bgColor:"#2c2c2c"
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
        setLoading(true);
        const formData = new FormData();
        formData.append("category",JSON.stringify(data));
        formData.append("file",image);

        try{
            const response = await addCategory(formData);
            if(response.status===201){
                setCategories([...categories,response.data]);
                toast.success("Data added succesfully")
                setData({
                    name:"",
                    description:"",
                    bgColor:""
                });
                setImage(false);
            }
            else{
                toast.error("Something went wrong");
            }
        }
        catch(error){
            console.log(error);
            toast.error("Something went wrong");
        }
        finally{
            setLoading(false);
        }

    }

    return (
    <div className="mx-2 mt-2">
        <div className="row">
            <div className="card col-md-12 form-container">
                <div className="card-bpdy">
                    <form onSubmit={onSubmitHandler}>
                        <div className="mb-3">
                            <label htmlFor="image" className="form-label">Image Upload
                                <br/>
                                <img
                                    src={image ? URL.createObjectURL(image) : assets.upload}
                                    alt="img"
                                    className="pt-3"
                                    style={{ cursor: "pointer" }}
                                    height={100}
                                    width={80}
                                    />
                            </label>
                            <input type="file" name="image" id="image" className="form-control" hidden
                            onChange={(e)=>setImage(e.target.files[0])}
                            required
                            ></input>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input type="text"
                            name="name"
                            id="name"
                            className="form-control"
                            placeholder="category Name"
                            onChange={onChangeHandler}
                            value={data.name}
                            required
                            ></input>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description</label>
                            <textarea
                            rows={3}
                            name="description"
                            id="description"
                            className="form-control"
                            placeholder="Write content here..."
                            onChange={onChangeHandler}
                            value={data.description}
                            ></textarea>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="bgColor" className="form-label mb-0">Background color</label>
                            <br/>
                            <input 
                            type="color"
                            name="bgColor"
                            id="bgColor"
                            placeholder="#ffffff"
                            onChange={onChangeHandler}
                            value={data.bgColor}
                            style={{ width: "60px", height: "40px", padding: "0", border: "none", cursor: "pointer" }}
                            required
                            ></input>
                        </div>
                        <button type="submit" className="btn btn-warning w-100 mb-2">Save</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CategoryForm