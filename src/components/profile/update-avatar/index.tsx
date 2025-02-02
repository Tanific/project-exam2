import * as React from "react";
import { updateAvatar } from "../../../slice/userSlice";
import { useUpdateUserAvatarMutation } from "../../../api/holidaze";
import { useDispatch } from "react-redux";
import { UpdateAvatarProps } from "../../../types/user";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Alert,
} from "@mui/material";

export default function UpdateAvatar(
  props: UpdateAvatarProps
): React.ReactElement {
  const { handleClose, open, name } = props;
  const [avatar, setAvatar] = React.useState<string>("");
  const [errorMessage, setErrorMessage] = React.useState("");

  const [updateUserAvatar] = useUpdateUserAvatarMutation();
  const dispatch = useDispatch();

  const handleUpdateAvatar = async (): Promise<void> => {
    try {
      const body = { avatar: { url: avatar, alt: "" } };
      await updateUserAvatar({ name, body }).unwrap();
      dispatch(updateAvatar({ url: avatar, alt: "" }));
      setAvatar("");
      setErrorMessage("");
      handleClose();
    } catch (error) {
      setErrorMessage(error.data.errors[0].message);
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle sx={{ color: "primary.main" }}>Update avatar</DialogTitle>
      <DialogContent sx={{ color: "primary.main" }}>
        <TextField
          fullWidth
          label="Avatar URL"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
          slotProps={{
            htmlInput: {
              style: { color: "black" },
            },
          }}
        />
        {errorMessage && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {errorMessage}
          </Alert>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleUpdateAvatar}>Update</Button>
      </DialogActions>
    </Dialog>
  );
}
