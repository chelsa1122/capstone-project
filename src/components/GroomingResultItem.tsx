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

function GroomingResultItem({id,title, imageUri, description, address, price, timing, rating, onBookAppointmentClick}) {
  return (
    <Box sx={{
        borderRadius: "20px",
        border: "2px solid #3949AB",
        background: "#FFF",
        color: "#616161",
    }}>
        <Stack direction="row" sx={{"marginTop": "1%", padding: "1%",}}>
            <Box sx={{"minHeight": "100%"
                   }}>
                <img src={imageUri} width="200px"  height="200px" 
                 style={{
                    "borderRadius": "20px",
                }} />
            </Box>
            <Stack direction="column" sx={{marginLeft: "2%"}}>
                {/* Title */}
                <Box>
                    <Typography variant="h6" sx={{fontWeight: 500}}>
                        {title}
                    </Typography>
                </Box>
                <Box sx={{marginTop: "3%"}}>
                    <Typography sx={{fontWeight: 400}}>
                        {description}
                    </Typography>
                </Box>
                <Box sx={{marginTop: "3%"}}>
                    <Typography sx={{fontWeight: 300}}>
                        {address}
                    </Typography>
                </Box>
                <Stack direction="row" sx={{marginTop: "5%"}}>
                    <Box>
                        <Typography>
                            ${price} / session
                        </Typography>
                    </Box>
                    <Box sx={{ height: "25px", marginLeft: "15px", paddingRight: "15px", borderLeft: "1px solid #BDBDBD"}}>
                    </Box>
                    <Typography sx={{color: "#2E7D32"}}>open</Typography>
                    <Typography sx={{marginLeft: "5%"}}>{timing}</Typography>
                </Stack>
                <Box>
                    <Rating name="read-only" value={rating || 1} precision={0.5} size="small" readOnly />
                </Box>
                <Stack direction="row-reverse" >
                    <Box>
                        <Button className="btn btn-primary" variant="contained"
                            endIcon={<CalendarIcon/>}
                            sx={{borderRadius:"10px"}}
                            onClick={onBookAppointmentClick}
                        >Book Appointment</Button>
                    </Box>
                </Stack>
            </Stack>
        </Stack>
    </Box>
  );
}

export default GroomingResultItem;
