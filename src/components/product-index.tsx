import { useEffect, useState } from "react"
import { Delete, GetAll } from "../services/product-api";
import { ProductCategory } from "../models/data-model";
import { Box, Button, Table, TableBody, TableCell, TableFooter, TableHead, TablePagination, TableRow } from "@mui/material";
import { Link } from "react-router-dom";

const ProductIndex = () => {

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };




    const [model, setModel] = useState<ProductCategory[]>([]);

    useEffect(() => {


        GetAll()
            .then(res => {
                setModel(res.data);
            })
            .catch(err => {

                console.log(err);
            })





    }, [model])


    function DeleteData(id: number) {

        if (window.confirm("Delete record?"))
            Delete(id).then(res => {
                GetAll().then(res => {
                    setModel(res.data);
                })
            });
    }

    return (
        <Box>
            <Table stickyHeader >
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {model
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((item, index) => (
                            <TableRow>
                                <TableCell>{item.productCategoryID}</TableCell>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>
                                    <Link to={"/edit/" + item.productCategoryID} >Edit</Link>
                                    <Button onClick={() => DeleteData(item.productCategoryID)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}

                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25, 100]}
                            component="div"
                            count={model.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}

                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </Box>
    )
}


export default ProductIndex