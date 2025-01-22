import { useEffect, useState } from "react"
import { Product, ProductCategory } from "../models/data-model"
import { Formik, FormikHelpers } from "formik";
import { CategoryValidation } from "../models/data-validation";
import { Box, Button, Divider, Paper, TextField } from "@mui/material";
import { Get, Save, Update } from "../services/product-api";
import { useHistory, useParams } from "react-router-dom";

export default function ProductEdit() {
    const [model, setModel] = useState<ProductCategory>(new ProductCategory());
    const [force, fixRender] = useState(true);
    const history = useHistory();
    const { id } = useParams<any>();

    useEffect(() => {
        Get(id).then(res => {
            setModel(res.data);
        })
    }, [])



    function FormSubmit(formData: ProductCategory, helpers: FormikHelpers<ProductCategory>) {
        Update(formData).then(res => {
            history.push('/');
        }).catch(err => {
            helpers.setErrors(err);
        })
    }
    function AddItem() {
        model.products.push(new Product());
        setModel(model);
        fixRender(p => !p);
    }

    function DeleteItem(index: number) {
        model.products.splice(index, 1);
        setModel(model);
        fixRender(p => !p);
    }


    return (
        <div>
            <Formik initialValues={model} enableReinitialize validationSchema={CategoryValidation} onSubmit={FormSubmit}
            >
                {formik => (
                    <form onSubmit={formik.handleSubmit}>
                        <Box>

                            <TextField name="name" fullWidth helperText={formik.errors.name} value={formik.values.name} onChange={formik.handleChange} ></TextField>


                            <Paper>
                                {model.products.map((prd, idx) => (
                                    <>
                                        <TextField name={`products[${idx}].name`} helperText="name" value={prd.name} onChange={formik.handleChange} />
                                        <TextField name={`products[${idx}].productNumber`} helperText="productNumber" value={prd.productNumber} onChange={formik.handleChange} />
                                        <TextField name={`products[${idx}].color`} helperText="color" value={prd.color} onChange={formik.handleChange} />

                                        <TextField name={`products[${idx}].listPrice`} helperText="List Price"  type="number" value={prd.listPrice} onChange={formik.handleChange} />
                                        <TextField name={`products[${idx}].standardCost`} helperText="Standard Cost" type="number" value={prd.standardCost} onChange={formik.handleChange} />
                                        <TextField name={`products[${idx}].size`} type="number" helperText="Size" value={prd.size} onChange={formik.handleChange} />
                                        <TextField name={`products[${idx}].weight`} type="number" helperText="Weight" value={prd.weight} onChange={formik.handleChange} />

                                        <Button type="button" onClick={()=> DeleteItem(idx) }>Delete</Button>

                                    </>
                                ))}

                            </Paper>

                            <Divider />
                            <Button type="submit" variant="outlined">Save</Button>
                            <Button type="button" variant="outlined" onClick={AddItem}>Add Product</Button>
                        </Box>
                    </form>
                )}
            </Formik>
        </div>
    )
}
