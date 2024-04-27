import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useFormik } from "formik";
import Select from "react-select";
import * as yup from "yup";
import { useState } from "react";
import { ErrorMessage, SuccessMessage } from "../../../helper/helper";

import {
  addProduct,
  updateProduct,
} from "../../../services/Products/ProductsApi";
import { useEffect } from "react";

const options = [
  { value: "Shirt", label: "Shirt" },
  { value: "Jeans", label: "Jeans" },
  { value: "T-shirt", label: "T-shirt" },
  { value: "Shoes", label: "Shoes" },
  { value: "Shorts", label: "Shorts" },
];

const style = {
  position: "absolute",
  top: "50%",
  height: 600,
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function AddProduct(props) {
  const { open, handleClose, isEdit, EditData, editId } = props;
  const [ProductImage, setProductImage] = useState();
  const [ProductPreview, setProductImagePreview] = useState("/default.jpeg");

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      quantity: "",
      price: "",
      category: "",
      brand: "",
    },
    enableReinitialize: true,

    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("description", values.description);
      formData.append("quantity", values.quantity);
      formData.append("price", values.price);
      formData.append("category", values.category);
      formData.append("brand", values.brand);
      formData.append("images", values.images);
      console.log(formData);

      // Assuming this code is within an async function or an asynchronous context

      if (isEdit) {
        const callAdd = await updateProduct(editId, formData);
        console.log(callAdd, "callAdd");
        if (callAdd.status) {
          SuccessMessage(callAdd.message);
          handleClose();
        }
      } else {
        const callAdd = await addProduct(formData);
        console.log(callAdd, "callAdd");
        if (callAdd.status) {
          SuccessMessage(callAdd.message);
          handleClose();
        }
      }
    },
    validationSchema: yup.object({
      name: yup.string().required(),
      description: yup.string().required(),
      quantity: yup.number().required(),
      price: yup.number().required(),
      category: yup.string().required(),
      brand: yup.string().required(),
      images: yup.mixed().required(),
    }),
  });

  useEffect(() => {
    isEdit && formik.setValues(EditData);
  }, [isEdit]);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h1>{isEdit ? "Edit" : "Add"} Product</h1>
          <form className="row g-3" onSubmit={formik.handleSubmit}>
            <div className="col-md-6">
              <label for="validationDefault01" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
              />
              {formik.touched.name && formik.errors.name && (
                <div style={{ color: "red" }}>{formik.errors.name}</div>
              )}
            </div>
            <div className="col-md-6">
              <label for="validationDefault02" className="form-label">
                description
              </label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
              />
              {formik.touched.description && formik.errors.description && (
                <div style={{ color: "red" }}>{formik.errors.description}</div>
              )}
            </div>
            <div className="col-md-6">
              <label for="validationDefaultUsername" className="form-label">
                quantity
              </label>
              <div className="input-group">
                <input
                  type="number"
                  className="form-control"
                  id="quantity"
                  name="quantity"
                  value={formik.values.quantity}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required
                />
                {formik.touched.quantity && formik.errors.quantity && (
                  <div style={{ color: "red" }}>{formik.errors.quantity}</div>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <label for="validationDefault03" className="form-label">
                price
              </label>
              <input
                type="text"
                className="form-control"
                id="price"
                name="price"
                value={formik.values.price}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
              />
              {formik.touched.price && formik.errors.price && (
                <div style={{ color: "red" }}>{formik.errors.price}</div>
              )}
            </div>
            <div className="col-md-6">
              <label for="validationDefault04" className="form-label">
                Category
              </label>
                  <Select
                    // defaultValue={selectedOption}
                    id="category"
                    name="category"
                    value={options.find((e) => e.value === formik.values.category)}
                    onChange={(e) => {
                      formik.setFieldValue("category", e.value);
                    }}
                    options={options}
                  />
            </div>
            <div className="col-md-6">
              <label for="validationDefault05" className="form-label">
                brand
              </label>
              <input
                type="text"
                className="form-control"
                id="brand"
                name="brand"
                value={formik.values.brand}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
              />
              {formik.touched.brand && formik.errors.brand && (
                <div style={{ color: "red" }}>{formik.errors.brand}</div>
              )}
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label for="formFile" className="form-label">
                  {" "}
                  file input example
                </label>
                <img
                  src={ProductPreview}
                  alt="Avatar Preview"
                  height={"40px"}
                  width={"40px"}
                />
                <input
                  className="form-control"
                  type="file"
                  id="formFile"
                  onChange={(e) => {
                    let file = e.target.files[0];
                    console.log(file);
                    setProductImagePreview(URL.createObjectURL(file));
                    formik.setFieldValue("images", file);
                  }}
                />
              </div>
            </div>

            <div className="col-12">
              <button className="btn btn-primary" type="submit">
                Submit form
              </button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
