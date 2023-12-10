import { Box, Button, Stack, Typography, Container, TextField} from "@mui/material";
import Image from "next/image";

function StepDescription({number, title, content}) {
  return (
    <Stack direction="column" sx={{"marginTop": "1%", "width": "120px"}}>
        <Box>
           <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="60" cy="60" r="60" fill="#FFECB3">
                </circle>
                <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="#FFFFFF"
                    fontSize="larger">
                    {number}
                </text>   
           </svg> 
        </Box>
        {/* Title */}
        <Box>
            <Typography variant="h6" align="center">
                {title}
            </Typography>
        </Box>
        <Box>
            <Typography fontWeight={500} align="center">
                {content}
            </Typography>
        </Box>
    </Stack>
  );
}

export default StepDescription;
