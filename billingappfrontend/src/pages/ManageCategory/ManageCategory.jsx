import CategoryForm from "../../components/categoryForm/CategoryForm";
import CategoryList from "../../components/CategoryList/CategoryList";
import "./ManageCategory.css";
import { AppContext } from "../../context/AppContext";
const ManageCategory = () => {

  return (
    <div className="category-container text-light">
        <div className="left-column">
            <CategoryForm/>
        </div>
        <div className="right-column">
            <CategoryList/>
        </div>
    </div>
  )
}

export default ManageCategory