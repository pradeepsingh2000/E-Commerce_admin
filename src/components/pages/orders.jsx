import { Button, Pagination, Switch } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useMemo } from "react";
import AlertModal from "../Modal/AlertModal";
import InfoIcon from '@mui/icons-material/Info';
import { useTable } from "react-table";
import {
  getAllOrders,
  getAllProduct,
  updateOrderStatus,
} from "../../services/Products/ProductsApi";
import { useCallback } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";

export default function Orders() {
  const [totalPages, settotalPages] = useState(0);
  const navigate = useNavigate();
  const [totalOrders, setTotalOrders] = useState();
  const [orders, setorders] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const [deliverstatus, setdeliverStatus] = useState();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(1);
  const [openStatus, setStatus] = useState(false);
  const [UpdateId, setUpdateId] = useState();
  const gotoDetailPage = (id) =>{
    navigate(`/orderDetail/${id}`)
  }
  const columns = useMemo(
    () => [
      {
        Header: "Amount",
        accessor: "totalAmount",
      },
      {
        Header: "Customer Name",
        accessor: "customerInfo.name",
      },
      {
        Header: "Customer Email",
        accessor: "customerInfo.email",
      },
      {
        Header: "Is Delivered",
        accessor: "status",
        Cell: ({ row }) => (
          <>
            <Switch
              checked={true ? row.original.status === "delivered" : false}
              onChange={(e) => {
                console.log(row, "the row");
                setUpdateId(row.original._id);
                setdeliverStatus(
                  row.original.status === "delivered"
                    ? "confirmed"
                    : "delivered"
                );
                setStatus(true);
              }}
              inputProps={{ "aria-label": "controlled" }}
            />
          </>
        ),
      },
      {
        Header:"Date",
        accessors:"createdAt",
        Cell:({row}) =>(
          moment(row.original.createdAt).format('YYYY-MM-DD HH:mm:ss') 
        ),
      },

      {
        Header: "Action",
        accessor: "actions",
        Cell: ({ row }) => (
          <div className="row">
            <div className="col">
              <Button
                variant="contained"
                color="success"
                startIcon={<InfoIcon fontSize="large" />}
                  onClick={() => {
                   gotoDetailPage(row.original._id) 
                }}
                size="large"
              >
                View
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
  const handelDeleteClose = () => {
    setStatus(false);
    setRefresh(true);
  };

  const handelDeleteConfirm = async () => {
    const data = await updateOrderStatus(UpdateId, deliverstatus);
    if (data.status) {
      setStatus(false);
      setRefresh(true);
    }
  };
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
    setRefresh(true);
  };

  const getAllData = useCallback(async () => {
    const info = {
      page: page ? page : "",
      limit: limit ? limit : "",
    };
    try {
      const data = await getAllOrders(info);
      console.log(data.data.data, "the data");
      
      if (data.status) {
        setorders(data.data.data);
        setTotalOrders(data.data.totalDoc);
        settotalPages(data.data.totalPage);
        // setopenDelete(false)
        setRefresh(false);
      }
    } catch (e) {
      setRefresh(false);
    }
  }, [page, limit]);

  useEffect(() => {
    refresh && getAllData();
  }, [refresh, getAllData]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: orders,
    });

  return (
    <div>
      <div className="container mt-4">
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
          count={Math.ceil(totalOrders / limit)}
          color="primary"
          page={page}
          onChange={handlePageChange}
        />

        {openStatus ? (
          <AlertModal
            text="Is Product delivered successfully to customer!"
            successMessage="Delivered Successfully"
            title="Order delivered?"
            handelDeleteClose={handelDeleteClose}
            handelDeleteConfirm={handelDeleteConfirm}
          />
        ) : null}
      </div>
    </div>
  );
}
