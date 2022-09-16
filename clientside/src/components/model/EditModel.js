import React, { useEffect, useState } from "react";
import { Box, Button, Icon } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useLocation } from "react-router";
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
      <Link to={`/cause/updatepost/${props.id}`}>
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
