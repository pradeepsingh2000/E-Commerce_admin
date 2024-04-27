import React, { useState, useMemo, useEffect, useCallback } from "react";
import { useTable } from "react-table";
import AddProduct from "./modal/addProduct";
import { Button, Modal } from "@mui/material";
import { deleteProduct, getAllProduct } from "../../services/Products/ProductsApi";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Pagination from "@mui/material/Pagination";
import AlertModal from "../Modal/AlertModal";
export default function Products() {
  const [open, setOpen] = useState(false);
  const [refresh, setRefresh] = useState(true);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3);
  const [search,setsearch] = useState("");

  const [editId,setEditId] = useState()
  const [isEdit,setEdit] = useState(false);
  const [EditData,setEditData] = useState();
  const [DeleteId,setDeleteId] = useState()
  const [brand, setBrand] = useState();
  const [openDelete,setopenDelete] = useState(false);
  const [totalPages, settotalPages] = useState(0);
  const [totalProducts, setTotalProducts] = useState();
  const [products, setProducts] = useState([]);


  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "description",
        accessor: "description",
      },
      {
        Header: "quantity",
        accessor: "quantity",
      },
      {
        Header: "price",
        accessor: "price",
        // Cell: ({ cell: { value } }) => value ? {value} : "-"
      },
      {
        Header: "brand",
        accessor: "brand",
      },
      {
        Header:"Category",
        accessor: "category",
      },
      {
        Header: "Action",
        accessor: "actions",
        Cell: ({ row }) => (
       
          <div className="row">
          <div className="col-4">
            <Button
              variant="contained"
              color="success"
              startIcon={<EditIcon fontSize="large" />}
              onClick={() => {
                setOpen(true);
                setEditData(row.original)
                setEditId(row.original._id);
                setEdit(true)
            }}
              size="large"
            >
            
            </Button>
          </div>
        
    <div className="col-4"></div>
        
          <div className="col-4">
            <Button
              variant="contained"
              color="error"
              startIcon={<DeleteIcon fontSize="large" />}
              onClick={() =>{
                setDeleteId(row.original._id)
                setopenDelete(true)}
              } 
              size="large"
            >
       
            </Button>
          </div>
        </div>
        
        ),
      },

      // {
      //   Header: "Premiered",
      //   accessor: "show.premiered",
      //   Cell: ({ cell: { value } }) => value || "-"
      // },
      // {
      //   Header: "Time",
      //   accessor: "show.schedule.time",
      //   Cell: ({ cell: { value } }) => value || "-"
      // },{}
    ],

    [refresh]
  );

  const handleClose = () => {
    setOpen(false);
    setRefresh(true);
  };

    const handelDeleteConfirm = async ()=> {
     const data = await deleteProduct(DeleteId)
     if(data.status) {
      setRefresh(true)
     }
    }

    const handelDeleteClose = ()=> {
      setopenDelete(false)
      setRefresh(true)
    };
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
    setRefresh(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      const info = {
        page: 1,
        search: search,
        limit: 10,
      }
      try {
        console.log(info, "the info");
        const data = await getAllProduct(info);
        if (data.status) {
          console.log(data);
          setProducts(data.data.docs);
          setTotalProducts(data.data.totalDocs);
          settotalPages(data.data.totalPages);
          setopenDelete(false)
          setRefresh(false);
        }
      } catch (e) {
        setRefresh(false);
      }
    };
  
    fetchData();
  }, [search]);


  const getAllData = useCallback(async () => {
    const info = {
      page: page,
      search: search,
      limit: limit,
    };
    try {
      console.log(info, "the info");
      const data = await getAllProduct(info);
      if (data.status) {
        console.log(data);
        setProducts(data.data.docs);
        setTotalProducts(data.data.totalDocs);
        settotalPages(data.data.totalPages);
        setopenDelete(false)
        setRefresh(false);
      }
    } catch (e) {
      setRefresh(false);
    }
  }, [page, search, limit]);

  useEffect(() => {
    refresh && getAllData();
  }, [refresh, getAllData]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: products,
    });

  return (
    <div>
      <div className="container mt-3">
      
        <div>
                <div className="search row mb-4">
                  <div className="col-5">
                  <Button
         variant="contained"
          startIcon={<AddCircleIcon fontSize="large" />}
          onClick={() => setOpen(true)}
          size="large"
        >
          Add
        </Button>
                  </div>
                  <div className="col-3">
                  <input
                    type="text"
                    aria-label="First name"
                    placeholder="Search.."
                    onChange={(e)=>{setsearch(e.target.value)}}
                    className="searchbtn"
                  />
                  </div>
                  <div className="col-3">
              
                  </div>
            
                 
                </div>
              </div>
       

        <table
          {...getTableProps()}
          className="table table-striped table-bordered"
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr
                {...headerGroup.getHeaderGroupProps()}
                className="table-active"
              >
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>
                      {cell.render("Cell")} {/* Render the value directly */}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
        <Pagination
          count={Math.ceil(totalProducts / limit)}
          color="primary"
          page={page}
          onChange={handlePageChange}
        />
      </div>

      {open ? <AddProduct open={open} isEdit={isEdit} EditData={EditData} editId={editId} handleClose={handleClose} /> : null}
      { openDelete ? <AlertModal text="Once deleted, you will not be able to recover this imaginary file!" title="Are you sure?" handelDeleteClose={handelDeleteClose} handelDeleteConfirm ={handelDeleteConfirm}/> : null}
    </div>
  );
}
