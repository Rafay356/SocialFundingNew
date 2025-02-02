import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import axios from "axios";
import { useParams } from "react-router-dom";

const DialogComponent = () => {
  const { id } = useParams();
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  //   const handleDeleteClick = () => {
  //     setDeleteConfirmOpen(true);
  //   };
  async function deleteHandler() {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.delete(`http://127.0.0.1:8000/cause/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDeleteConfirmOpen(true);
      window.location.reload();
      return res;
    } catch (error) {
      console.error("Delete error:", error);
    }
  }
  return (
    <Dialog
      open={deleteConfirmOpen}
      onClose={() => setDeleteConfirmOpen(false)}
    >
      <DialogTitle>Delete Post</DialogTitle>
      <DialogContent>Are you sure you want to delete this post?</DialogContent>
      <DialogActions>
        <Button onClick={() => setDeleteConfirmOpen(false)}>Cancel</Button>
        <Button onClick={deleteHandler} color="error" variant="contained">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogComponent;
