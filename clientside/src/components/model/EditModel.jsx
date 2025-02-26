import React from "react";
import { Box, Button, Paper, Popper, Grow } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import axios from "axios";
import { styled } from "@mui/material/styles";
import ClickAwayListener from "@mui/material/ClickAwayListener";

const EditModel = (props) => {
  const { id, anchorEl, open, handleClose, onDeleteSuccess } = props;
  const MenuButton = styled(Button)(({ theme }) => ({
    justifyContent: "flex-start", // Aligns button content to the left
    padding: "10px 15px", // Adds padding around button content
    textTransform: "none", // Prevents text from being all uppercase
    fontSize: "0.9rem", // Sets font size
    fontWeight: 400, // Sets font weight
    transition: "all 0.2s", // Smooth transition for hover effects
    "&:hover": {
      backgroundColor: "#f5f5f5", // Light gray background on hover
    },
  }));
  async function deleteHandler() {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.delete(`http://127.0.0.1:8000/cause/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      handleClose();
      if (onDeleteSuccess) {
        onDeleteSuccess();
      }
      return res;
    } catch (error) {
      console.error("Delete error:", error);
    }
  }

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <Popper
        open={open}
        anchorEl={anchorEl}
        placement="bottom-end"
        transition
        style={{ zIndex: 1000 }}
      >
        {({ TransitionProps }) => (
          <Grow {...TransitionProps}>
            <Paper
              sx={{
                borderRadius: "8px",
                boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
                overflow: "hidden",
                mt: 0.5,
                width: "150px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  bgcolor: "white",
                }}
              >
                <Link
                  to={`/cause/updatepost/${id}`}
                  style={{ textDecoration: "none" }}
                >
                  <MenuButton
                    fullWidth
                    sx={{
                      color: "#075e54",
                    }}
                    startIcon={<EditIcon />}
                  >
                    Edit
                  </MenuButton>
                </Link>
                <MenuButton
                  fullWidth
                  onClick={deleteHandler}
                  sx={{
                    color: "#dc3545",
                  }}
                  startIcon={<DeleteIcon />}
                >
                  Delete
                </MenuButton>
              </Box>
            </Paper>
          </Grow>
        )}
      </Popper>
    </ClickAwayListener>
  );
};

export default EditModel;
