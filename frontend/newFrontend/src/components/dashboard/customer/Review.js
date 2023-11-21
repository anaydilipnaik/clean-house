import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import axios from "axios";
import { serverURL } from "../../../utils/config";

const Review = ({ open, handleClose, serviceId, userId }) => {
  const [text, setText] = React.useState(null);
  const [rating, setRating] = React.useState(null);

  const submitReview = (e) => {
    e.preventDefault();
    let data = {};
    data.user_id = userId;
    data.service_request_id = serviceId;
    data.feedback = text;
    data.rating = rating;
    data.image = "";
    axios
      .post(serverURL + "/feedback", data)
      .then(() => {
        handleClose(e);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Submit a Review</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Write a detailed review/feedback for the service you just availed. It helps us improve our
          offerings!
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Review"
          type="text"
          fullWidth
          variant="standard"
          onChange={(e) => setText(e.target.value)}
        />
        <DialogContentText sx={{ marginTop: "25px" }}>Please provide a rating</DialogContentText>
        <Box
          sx={{
            "& > legend": { mt: 2 },
          }}
        >
          <Rating
            name="simple-controlled"
            value={rating}
            onChange={(event, newValue) => {
              setRating(newValue);
            }}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={(e) => handleClose(e)}>Cancel</Button>
        <Button onClick={submitReview}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
};

export default Review;
