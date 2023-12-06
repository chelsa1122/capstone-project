import { Box, Button, Stack, Typography, Container, TextField} from "@mui/material";
import Image from "next/image";

function GroomingResultItem({id,title, imageUri, description, address, price, timing, rating, onBookAppointmentClick}) {
  return (
  	<Box>
	    <Stack direction="row" sx={{"marginTop": "1%"}}>
	        <Box sx={{"minHeight": "100%"}}>
	            <img src={imageUri} width="200px" height="200px" />
	        </Box>
	        <Stack direction="column">
	            {/* Title */}
	            <Box>
	                <Typography variant="h6">
	                    {title}
	                </Typography>
	            </Box>
	            <Box>
	                <Typography fontWeight={500}>
	                    {description}
	                </Typography>
	            </Box>
	            <Box>
	                <Typography fontWeight={500}>
	                    {address}
	                </Typography>
	            </Box>
	            <Stack direction="row">
		            <Box>
		                <Typography fontWeight={500}>
		                    {price}
		                </Typography>
		            </Box>
		            <Typography>|</Typography>
		            <Box>
		            	<Typography>open</Typography>
		            	<Typography>{timing}</Typography>
		            </Box>
		        </Stack>
		        <Stack direction="row">
		            <Box>
		                <Button>Book Appointment</Button>
		            </Box>
		        </Stack>
	        </Stack>
	    </Stack>
    </Box>
  );
}

export default GroomingResultItem;
