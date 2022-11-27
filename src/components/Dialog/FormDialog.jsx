import { useState } from "react";

import CloseIcon from "@mui/icons-material/Close";
import { Grid, IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";

import PropTypes from "prop-types";

import { StyledButton } from "components/Button";

const FormDialog = ({ content, title, children, variant }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <StyledButton variant={variant} onClick={handleOpen}>
        {content}
      </StyledButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            {title}
            <IconButton aria-label="close" onClick={handleClose}>
              <CloseIcon fontSize="inherit" />
            </IconButton>
          </Box>
        </DialogTitle>
        {children}
      </Dialog>
    </div>
  );
};

FormDialog.propTypes = {
  content: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  variant: PropTypes.string,
};

FormDialog.defaultProps = {
  content: "",
  title: "",
  variant: "",
};

export { FormDialog };
