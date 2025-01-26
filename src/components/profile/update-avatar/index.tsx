import * as React from "react";
import { updateAvatar } from "../../../user/userSlice";
import { useUpdateUserAvatarMutation } from "../../../api/holidaze";
import { useDispatch } from "react-redux";
import { UpdateAvatarProps } from "../../../types/user";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from "@mui/material";

export default function UpdateAvatar(props: UpdateAvatarProps): React.ReactElement {
  const { handleClose, open, name } = props;
  const [avatar, setAvatar] = React.useState <string>(""); 
  const [updateUserAvatar] = useUpdateUserAvatarMutation();
  const dispatch = useDispatch();

  const handleUpdateAvatar = async ():  Promise<void> => {
    try {
      const body = { avatar: { url: avatar, alt: "" } };
      await updateUserAvatar({ name, body }).unwrap();
      dispatch(updateAvatar(({ url: avatar, alt: "" })));
    } catch (error) {
      console.error("Failed to update avatar:", error);
    }
    handleClose();
    setAvatar("");
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle sx={{ color: "primary.main"}}>Update avatar</DialogTitle>
      <DialogContent sx={{ color: "primary.main"}}>
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
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleUpdateAvatar}>Update</Button>
      </DialogActions>
    </Dialog>
  );
}