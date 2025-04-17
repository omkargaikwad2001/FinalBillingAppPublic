import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { deleteItem } from "../../Service/ItemService";
import { AppContext } from "../../context/AppContext";

const ItemList = () => {

  const {itemsData, setItemsData, loadCategories} = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredItemes = itemsData.filter(item=>item.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const removeItem = async (itemId) =>{

    try {

      const response = await deleteItem(itemId)
      if(response.status===204){
        const updatedItem=itemsData.filter(item=>item.itemId !== itemId);
        setItemsData(updatedItem)
        toast.success("Item deleted")
        await loadCategories();
      }
      else{
        toast.error("Unable to delete Item")
      }

    } catch (error) {
        console.log(error)
        toast.error("Unable to delete Item")
    }

  }

  return (
    <div className="category-list-container" style={{height:`100vh`, overflowY:`auto`, overflowX:`hidden`}}>
      <div className="row pe-2">
        <div className="input-group mb-3">
          <input type="text" 
          name="keyword" 
          id="keyword" 
          placeholder="Search by keyword" 
          onChange={(e)=>setSearchTerm(e.target.value)}
          value={searchTerm}
          className="form-control">
          </input>
          <span className="input-group-text bg-warning">
            <i className="bi bi-search"></i>
          </span>
        </div>
      </div>

      <div className="row g-3 pe-2">
        {
          filteredItemes.map((item,index) => (
            <div key={index} className="col-12">
            <div className="card-p3">
              <div className="d-flex align-item-center bg-dark p-2">
                <div style={{marginRight:`15px`}}>
                  <img src={item.imgUrl} alt="image" className="category-image"></img>
                </div>
                <div className="flex-grow-1">
                  <h5 className="mb-1 text-white">{item.name}</h5>
                  <p className="mb-0 text-white">Category: {item.categoryName}</p>
                  <span className="mb-0 text-block badge rounded-pill text-bg-warning">&#8377;{item.price}</span>
                </div>
                <div className="p-3">
                  <button className="btn btn-danger btn-sm"
                  onClick={()=>removeItem(item.itemId)}>
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              </div>
            </div>
            </div>
          ))
        }
      </div>

    </div>
  )
}

export default ItemList