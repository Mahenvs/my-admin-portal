import Form from "react-bootstrap/Form";
import Button from "../UI_Elements/Button";
import { form_data } from "../data";
import { Link, useNavigate } from "react-router-dom";

import CustomFormControl from "../UI_Elements/CustomFormControl";
import CustomFormLabel from "../UI_Elements/CustomFormLabel";
import { useRef, useState } from "react";
// import Modal from "./Modal";
import Card from "../UI_Elements/Card";
import { useSelector } from "react-redux";

const AddProduct = () => {

  const storeId = useSelector((store) => store.store.storeId);
  const navigate = useNavigate();

  const [formValue, setFormValue] = useState({
    Name: "",
    Category: "",
    Description: "",
    Price: "",
    DiscountedPrice: "",
    Unit: "",
  });
  const modal = useRef();
  const handlerInput = (event) => {
    setFormValue({
      ...formValue,
      [event.target.id]: event.target.value,
    });
  };

  const url = import.meta.env.VITE_CREATE_PRODUCTS+`${storeId}/products`;

  const onSave = async () => {
    
    const username = 'user';
    const password = 'market';
    const basicAuthToken = btoa(`${username}:${password}`);
    try {
      const response = await fetch(url, {
        method: "POST",
      body: JSON.stringify({
        "productName" :formValue.Name,
        "productDescription": formValue.Description,
        "productPrice" : formValue.Price,
        "productStockQuantity": 5,
        "categoryName":formValue.Category,
        "unitId": +formValue.Unit,
        "storeId": storeId ,
        "productImageUrl": "https://www.google.com/"
  
      }),
      headers: {
        'Authorization': `Basic ${basicAuthToken}`,
        'Content-Type': 'application/json'
      },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      navigate('/products');
      const result = await response.json();
      navigate('/products');

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <Card>
        <span className="flex justify-center ">
          <Form className="my-3">
            <h3 className="my-1 text-2xl font-bold">Add a Product</h3>
            {form_data.map((item, index) => (
              <section className="mt-3 " key={index}>
                <CustomFormLabel label={item.label} />
                <CustomFormControl
                  title={item.title}
                  type={item.type}
                  id={item.id}
                  inputChange={handlerInput}
                  value={formValue.id}
                />
              </section>
            ))}
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
