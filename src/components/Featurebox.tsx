import { Box, Button, Stack, Typography, Container, TextField} from "@mui/material";
import Image from "next/image";

function FeatureBox({title, content}) {
  return (
    <Stack direction="row" sx={{"marginTop": "1%"}}>
        <Box sx={{"minHeight": "100%"}}>
            <Box sx={{"marginTop": "50%", "minHeight": "100%" }}>
                <svg width="62" height="24" viewBox="0 0 62 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.5 33L57.8571 4" stroke="#283593" stroke-width="8" stroke-linecap="round"/>
                    <path d="M18.5 33L11.25 23.8421L4 14.6842" stroke="#283593" stroke-width="8" stroke-linecap="round"/>
                </svg> 
            </Box>
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
                    {content}
                </Typography>
            </Box>
        </Stack>
    </Stack>
  );
}

export default FeatureBox;
