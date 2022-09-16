import React from "react";
import { Box, Button, Icon } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import axios from "axios";

const EditModel = (props) => {
  const { id } = props;
  async function deleteHandler() {
    const res = await axios.delete("http://127.0.0.1:8000/cause/" + id);
    return res;
  }

  return (
    <Box>
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
