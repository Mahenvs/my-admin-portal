import Form from "react-bootstrap/Form";
import Button from "../UI_Elements/Button";
import { form_data } from "../data";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CustomFormControl from "../UI_Elements/CustomFormControl";
import CustomFormLabel from "../UI_Elements/CustomFormLabel";
import { useState } from "react";
import Card from "../UI_Elements/Card";
import { useSelector } from "react-redux";
import { basicAuthToken } from "../Utilities/getHeaders";

const AddProduct = () => {
  const storeId = useSelector((store) => store.store.storeId);
  const navigate = useNavigate();
  // const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedImgUrl, setuploadedImgUrl] = useState(null);

  const [formValue, setFormValue] = useState({
    Name: "",
    Category: "",
    Description: "",
    Price: "",
    DiscountedPrice: "",
    Unit: "",
  });

  const handlerInput = (event, flag) => {
    setFormValue({
      ...formValue,
      [event.target.id]: event.target.value,
    });

    if (flag == "Image") {
      // setSelectedFile(event.target.files[0]);
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
      fetch("http://192.168.1.254:8100/products/images/upload", requestOptions)
        .then((response) => response.text())
        .then((result) => {
          setuploadedImgUrl(result);
        })
        .catch((error) => console.log("error", error));
    }
  };


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
          productStockQuantity: 5,
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
      navigate("/products");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <Card>
        <span className="flex justify-center">
          <Form className=" shadow-lg px-5 py-1">
            <h3 className="mt-1 text-2xl font-bold">Product Information</h3>
            <input type="file" className="hidden border" id="file-input" />
            {form_data.map((item, index) => (
              <section className=" mt-3 flex gap-4 items-center justify-end  " key={index}>
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
            <section className="items-center justify-center flex gap-7">
            <CustomFormLabel label="Image"/>
            <div>
            <input className="rounded mt-3" type="file" onChange={(e) => handlerInput(e, "Image")} />
            </div>
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
