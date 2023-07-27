import { Dialog } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { handleDialogClose, isDialogOpenSelector } from "../redux/dialogSlice";

 const CustomDialog = (props) => {
  const openDialog = useSelector(isDialogOpenSelector);
  const dispatch = useDispatch();
  const { children } = props;
  return (
    // <Dialog
    //   open={openDialog}
    //   onClose={() => dispatch(handleDialogClose())}
    //   aria-labelledby="alert-dialog-title"
    //   aria-describedby="alert-dialog-description"
    // >
    //   {children}
    // </Dialog>
    <></>
  );
};

export default CustomDialog