import axios from "axios";
// import { use } from "react";
export const userColumns = [
  { field: "id", headerName: "ID", width: 50 },
  {
    field: "name",
    headerName: "User",
    width: 180,
  },
  { field: "email", headerName: "Email", width: 200 },
  {
    field: "phoneNumber",
    headerName: "Phone Number",
    type: "number",
    width: 130,
  },
  {
    field: "uniqueId",
    headerName: "Unique Id",
    width: 320,
  },
];

export let userRows = []; // Default empty array

export const fetchUserData = async () => {
  try {
    const response = await axios.get(
      "http://localhost:8000/api/user/getAllUser"
    );

    userRows = response.data.data.map((user, index) => ({
      id: user.id || index + 1,
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      uniqueId: user.uniqueId,
    }));
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};
export let userById = {
  id: "",
  name: "",
  email: "",
  phoneNumber: "",
  uniqueId: "",
};
export const fetchSingleUserData = async (userid) => {
  try {
    const response = await axios.get(
      "http://localhost:8000/api/user/getUserById",
      {
        headers: {
          id: userid,
        },
      }
    );
    let user = response.data.data;
    console.log(user);
    userById.id = user.id;
    userById.name = user.name;
    userById.email = user.email;
    userById.phoneNumber = user.phoneNumber;
    userById.uniqueId = user.uniqueId;
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};
