import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Divider,
  Grid,
  IconButton,
  Rating,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  SvgIcon,
} from "@mui/material";
import CalendarIcon from "@/components/CalendarIcon";
import Image from "next/image";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

const AppointmentDialog = ({ open, handleClose, children }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentDialog;