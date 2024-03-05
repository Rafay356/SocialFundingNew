import React from "react";
import { Box, Button, Icon } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Popper from "@mui/material/Popper";
import { Link } from "react-router-dom";
import axios from "axios";

const EditModel = (props) => {
  const { id } = props;
  async function deleteHandler() {
    const res = await axios.delete("http://127.0.0.1:8000/cause/" + id, {
      headers: {
        Authorization: "Bearer ",
      },
    });
    return res;
  }

  return (
    <Box
      sx={{
        backgroundColor: "rgba(238, 238, 238)",
        marginLeft: "201px",
        position: "absolute",
        zIndex: 500,
        overFlow: "auto",
      }}
    >
      <Link to={`/cause/updatepost/${id}`}>
        <Button variant="text" size="small" startIcon={<EditIcon />}>
          Edit
        </Button>
      </Link>
      <Button
        variant="text"
        color="error"
        size="small"
        startIcon={<DeleteIcon />}
        onClick={deleteHandler}
      >
        Delete
      </Button>
    </Box>
  );
};

export default EditModel;
