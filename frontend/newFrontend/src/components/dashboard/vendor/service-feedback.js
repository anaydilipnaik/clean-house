import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { serverURL } from "../../../utils/config";
import { Box } from "@mui/system";
import { DialogContentText, Rating } from "@mui/material";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function CustomizedDialogs({ id, customer_id }) {
  const [open, setOpen] = React.useState(false);
  const [feedback, setFeedback] = React.useState("");
  const [rating, setRating] = React.useState(0);

  const handleClickOpen = () => {
    setOpen(true);
    console.log("onReviewsClick", id);
    axios
      .get(`${serverURL}/services/requests/${customer_id}`)
      .then((res) => {
        console.log("res: ", res);
        const pastServices = res.data.past_services;
        for (let i = 0; i < pastServices.length; i++) {
          if (pastServices[i].id == id) {
            console.log(pastServices[i].feedback.feedback);
            setFeedback(pastServices[i].feedback.feedback);
            setRating(pastServices[i].feedback.rating);
          }
        }
      })
      .catch((err) => {
        console.log("Err ", err);
      });
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        View Feedback
      </Button>
      <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Feedback
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <DialogContentText>
            <Typography gutterBottom>
              {!feedback ? "No feedback provided yet!" : feedback}
            </Typography>
          </DialogContentText>
          <DialogContentText>
            <Box
              sx={{
                "& > legend": { mt: 2 },
              }}
            >
              <Rating name="simple-controlled" value={rating} readOnly />
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
