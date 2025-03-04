import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  userColumns,
  fetchUserData,
  userRows,
} from "./../../datatableSourceUser";

import "./datatable.scss";
import { Link } from "react-router-dom";

const Datatable = () => {
  const [data, setData] = useState(userRows);
  const [users, setUsers] = useState(userRows);

  useEffect(() => {
    const getData = async () => {
      await fetchUserData();
      setUsers(userRows);
    };
    getData();
  }, []);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: ({ row }) => (
        <div className="cellAction">
          <Link to={`/users/${row.id}`} className="viewButton">
            View
          </Link>
          <div className="deleteButton" onClick={() => handleDelete(row.id)}>
            Delete
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="datatable">
      <div className="datatableTitle">
        {/* <span>Add New User</span>
        <Link to="/users/userId/new" style={{ textDecoration: "none" }}>
          <span className="link">Add New</span>
        </Link> */}
      </div>
      <DataGrid
        className="datagrid"
        rows={users}
        columns={userColumns.concat(actionColumn)}
        pageSize={8}
        rowsPerPageOptions={[5]}
      />
    </div>
  );
};
export default Datatable;
