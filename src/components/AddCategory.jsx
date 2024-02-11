import CustomFormLabel from '../UI_Elements/CustomFormLabel'
import { useGetCategories } from '../Hooks/useGetCategories'
import CustomDropDown from '../UI_Elements/CustomDropDown'
import { useSelector } from "react-redux";
const AddCategory = () => {
  const handlerInput = (data) =>{
    console.log(data);
  }

  useGetCategories();
  const categoriesList = useSelector(store => store.product.categoriesList);
  
  return (
    <div>
        <h3 className="mt-1 text-2xl font-bold">Category Information</h3>
        <input type="file" className="hidden border" id="file-input" />
        <CustomFormLabel label={"Category Name"} />
                <CustomDropDown
                  title={"Category Name"}
                  type="text"   
                  options={categoriesList}            
                  inputChange={handlerInput}
                  
                />
    </div>
  )
}

export default AddCategory