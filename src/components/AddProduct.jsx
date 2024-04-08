import Form from "react-bootstrap/Form";
import Button from "../UI_Elements/Button";
import { form_data } from "../data";
import { useNavigate } from "react-router-dom";
import CustomFormControl from "../UI_Elements/CustomFormControl";
import CustomFormLabel from "../UI_Elements/CustomFormLabel";
import { useState } from "react";
import Card from "../UI_Elements/Card";
import { useSelector,useDispatch } from "react-redux";
import { basicAuthToken } from "../Utilities/getHeaders";
import CustomDropDown from "../UI_Elements/CustomDropDown";
import { useGetCategories } from "../Hooks/useGetCategories";
import useGetUnits from "../Hooks/useGetUnits";
import { setCurrentPath } from "../store/storeSlice";

const AddProduct = () => {
  useGetCategories();
  useGetUnits();
  const storeId = useSelector((store) => store.store.storeId);
  const navigate = useNavigate();

  const [uploadedImgUrl, setuploadedImgUrl] = useState(null);
  const dispatch = useDispatch();
  const imgUrl = import.meta.env.VITE_API_URL_PRODUCT;
  const [formValue, setFormValue] = useState({
    Name: "",
    Category: "",
    Description: "",
    Price: "",
    DiscountedPrice: "",
    Unit: "",
  });
  let categoriesList = useSelector((store) => store.product.categoriesList);
  let units = useSelector((store) => store.product.units);
  const handlerInput = (event, flag) => {
    console.log(event.target.value, event.target.id);
    setFormValue({
      ...formValue,
      [event.target.id]: event.target.value,
    });

    if (flag == "Image") {
      const formData = new FormData();
      formData.append("file", event.target.files[0]);

      const requestOptions = {
        method: "POST",
        headers: {
          Authorization: `Basic ${basicAuthToken}`,
        },
        body: formData,
        redirect: "follow",
      };
      fetch(imgUrl+"/products/images/upload", requestOptions)
        .then((response) => response.text())
        .then((result) => {
          setuploadedImgUrl(result);
        })
        .catch((error) => console.log("error", error));
    }
  };

  const [isNewCategory, setNewCategory] = useState(true);

  const url = import.meta.env.VITE_CREATE_PRODUCTS + `${storeId}/products`;
  const onSave = async () => {
    const username = "user";
    const password = "market";
    const basicAuthToken = btoa(`${username}:${password}`);
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          productName: formValue.Name,
          productDescription: formValue.Description,
          productPrice: formValue.Price,
          productStockQuantity:formValue.Stock,
          categoryName: formValue.Category,
          unitId: +formValue.Unit,
          storeId: storeId,
          productImageUrl: uploadedImgUrl,
        }),
        headers: {
          Authorization: `Basic ${basicAuthToken}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      dispatch(setCurrentPath("/products"));
      navigate("/products");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handlerDropdown = (data, flag) => {
    console.log("data",data,flag);
    formValue[flag] = data;
  };

  return (
    <>
      <Card>
        <span className="flex justify-center">
          <Form className=" shadow-lg px-5 py-1">
            <h3 className="mt-1 text-2xl font-bold">Product Information</h3>
            <section className="mt-3 flex gap-4 items-center justify-end  ">
              <CustomFormLabel label={"Category"} />
              {isNewCategory ? (
                <CustomFormControl
                  title={"Category"}
                  type="text"
                  id={"Category"}
                  inputChange={(e) => handlerInput(e, "Category")}
                  value={formValue.id}
                />
              ) : (
                <CustomDropDown
                  title={"Category"}
                  type="dropdown"
                  options={categoriesList}
                  itemName={"categoryName"}
                  itemId={"categoryId"}
                  inputChange={(e) => handlerDropdown(e, "Category")}
                />
              )}
            </section>
            <p
              className="text-sm flex justify-end mb-2 text-slate-500 cursor-pointer"
              onClick={() => {
                setNewCategory(!isNewCategory);
              }}
            >
              {!isNewCategory
                ? "Don't find a category? Add New."
                : "Use existing categories?"}
            </p>

            <section className="mt-3 flex gap-4 items-center justify-end  ">
              <CustomFormLabel label="Image" />
              <div className="w-[25rem]  p-1 my-2 rounded text-xl   justify-end">
                <input
                  className="rounded mt-3"
                  type="file"
                  onChange={(e) => handlerInput(e, "Image")}
                />
              </div>
            </section>
            <input type="file" className="hidden border" id="file-input" />
            {form_data.map((item, index) => (
              <section
                className=" mt-3 flex gap-4 items-center justify-end  "
                key={index}
              >
                <CustomFormLabel label={item.label} />
                <CustomFormControl
                  title={item.title}
                  type={item.type}
                  id={item.id}
                  inputChange={(e) => handlerInput(e, item.label)}
                  value={formValue.id}
                />
              </section>
            ))}
            <section className="mt-3 flex gap-4 items-center justify-end  ">
              <CustomFormLabel label={"Units"} />

              <CustomDropDown
                title={"Unit"}
                type="dropdown"
                options={units}
                itemName={"unitName"}
                itemId={"unitId"}
                inputChange={(e) => handlerDropdown(e, "Unit")}
              />
            </section>
            <span className="flex justify-end mb-1">
              <Button
                title="Save"
                class="text-right h-9"
                onClickButton={onSave}
              >
                {" "}
              </Button>
            </span>
          </Form>
        </span>
      </Card>
    </>
  );
};

export default AddProduct;
