import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { serverURL } from "../../../utils/config";
import Drag from "./Drag";

const Book = ({ open, handleClose, serviceId, userId, setIsServices }) => {
  const confirmBooking = (e) => {
    e.preventDefault();
    let data = {};
    data.user_id = userId;
    data.service_id = serviceId;
    data.image = "";
    axios
      .post(serverURL + "/services/book", data)
      .then(() => {
        handleClose(e);
        setIsServices(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Book Appointment</DialogTitle>
      <DialogContent>
        <Drag />
      </DialogContent>
      <DialogActions>
        <Button onClick={(e) => handleClose(e)}>Cancel</Button>
        <Button onClick={confirmBooking}>Book</Button>
      </DialogActions>
    </Dialog>
  );
};

export default Book;
