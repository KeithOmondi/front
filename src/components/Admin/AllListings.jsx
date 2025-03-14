import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import axios from "axios";
import { server } from "../../server";

const AllListings = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(`${server}/listing/admin-all-listings`, { withCredentials: true }).then((res) => {
      setData(res.data.listings);
    });
  }, []);

  const columns = [
    { field: "id", headerName: "Listing Id", minWidth: 150, flex: 0.7 },
    {
      field: "name",
      headerName: "Name",
      minWidth: 180,
      flex: 1.4,
    },
    {
      field: "price",
      headerName: "Price",
      minWidth: 100,
      flex: 0.6,
    },
    {
      field: "availability",
      headerName: "Availability",
      type: "string",
      minWidth: 100,
      flex: 0.6,
    },
    {
      field: "sold",
      headerName: "Sold",
      type: "number",
      minWidth: 130,
      flex: 0.6,
    },
    {
      field: "Preview",
      flex: 0.8,
      minWidth: 100,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/listing/${params.id}`}>
              <Button>
                <AiOutlineEye size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  data &&
    data.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        price: "Ksh " + item.discountPrice,
        availability: item.availability,
        sold: item?.sold_out,
      });
    });

  return (
    <>
      <div className="w-full mx-8 pt-1 mt-10 bg-white">
        <DataGrid rows={row} columns={columns} pageSize={10} disableSelectionOnClick autoHeight />
      </div>
    </>
  );
};

export default AllListings;
