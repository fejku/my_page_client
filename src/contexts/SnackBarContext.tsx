import React, { createContext } from "react";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

type Color = "success" | "info" | "warning" | "error";

interface ISnackBar {
  show: (msg: string, severity?: Color) => void;
}

const SnackBarContext = createContext({} as ISnackBar);

const SnackBarProvider: React.FC = ({ children }) => {
  const [openSnackBar, setOpenSnackBar] = React.useState(false);
  const [msgSnackBar, setMsgSnackBar] = React.useState("");
  const [severitySnackBar, setSeveritySnackBar] = React.useState<Color>(
    "success"
  );

  const show = (msg: string, severity: Color = "success") => {
    setMsgSnackBar(msg);
    setSeveritySnackBar(severity);
    setOpenSnackBar(true);
  };

  const onCloseSnackBar = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackBar(false);
  };

  return (
    <>
      <SnackBarContext.Provider
        value={{
          show,
        }}
      >
        {children}
        <Snackbar
          open={openSnackBar}
          autoHideDuration={6000}
          onClose={onCloseSnackBar}
        >
          <Alert onClose={onCloseSnackBar} severity={severitySnackBar}>
            {msgSnackBar}
          </Alert>
        </Snackbar>
      </SnackBarContext.Provider>
    </>
  );
};

export { SnackBarContext, SnackBarProvider };
