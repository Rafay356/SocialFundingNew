import React, { useEffect } from "react";
import { Box, Button, Icon } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import axios from "axios";
import UpdateCard from "../updateCard/UpdateCard";

const EditModel = (props) => {
  async function deleteHandler() {
    const res = await axios.delete("http://127.0.0.1:8000/cause/" + props.id);
    return res;
  }
  return (
    <Box sx={{ maxWidth: "50%", float: "right" }}>
      <Button variant="text" size="small" startIcon={<EditIcon />}>
        Edit
      </Button>
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
