import GroomingHero from "@/components/GroomingHero";
import Navbar from "@/components/Navbar";
import FeatureBox from "@/components/Featurebox";
import StepDescription from "@/components/StepDescription";
import { Box, Button, Stack, Typography, Container, TextField} from "@mui/material";
import Link from "next/link";
import React from "react";



function Grooming() {
    // const [location, setLocation] = useState("");
    // const [password, setPassword] = useState("");
    // const [showPassword, setShowPassword] = useState(false);
    // const [loginStatus, setLoginStatus] = useState<any>(null);
    // const router = useRouter();

    // Set banner height and adjust starting of search bar depending on it.
    let bannerHeight = 75; // vw  
    let contentMarginTop = bannerHeight - 14; // vw
    contentMarginTop = contentMarginTop <= 50 ? 50 : contentMarginTop; // clip at 50%
    return (
    <Box>
        <Box sx={{
            width: '100vw', 
            position: "absolute",
            height: bannerHeight + "vw",
            left: 0,
            top: 0,
            // height: "70%",
            backgroundImage: "url(\"/Images/grooming-banner.jpg\")",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            zIndex: "-1",
            }}>
            </Box>
            <Box>
                <Navbar />
                <Container
                    sx={{
                        borderRadius:"67.5px",
                        background: "#FAFAFA",
                        marginTop: contentMarginTop + "vw",
                        // paddingTop: "2%",
                        // paddingBottom: "2%",
                    }}
                    >
                    {/* Horizonatal form */}
                    <Stack direction="row" useFlexGap={true} spacing={1}  justifyContent="space-between"
                        sx={{paddingTop: "2%", paddingBottom: "2%"}}>
                        {/* Each form field vertical */}
                        <Stack direction="col">
                            <Box><Typography>Location</Typography></Box>
                            <TextField
                                // label="Location"
                                type={"text"}
                                variant="outlined"
                                // value={password}
                                // onChange={(e) => setPassword(e.target.value)}
                                sx={{
                                    "display": "flex",
                                    "borderRadius": "4px",
                                    "padding": "8px 12px",
                                }}
                              />
                        </Stack>
                        <Stack direction="col">
                            <Box><Typography>Dates</Typography></Box>
                            <TextField
                                // label="Dates"
                                type={"text"}
                                variant="outlined"
                                // value={password}
                                // onChange={(e) => setPassword(e.target.value)}
                              />
                        </Stack>
                        <Stack direction="col">
                            <Box><Typography>Number of Pets</Typography></Box>
                            <TextField
                                // label="NumberOfPets"
                                type={"text"}
                                variant="outlined"
                                // value={password}
                                // onChange={(e) => setPassword(e.target.value)}
                              />
                        </Stack>
                    </Stack>
                </Container>
                {/* GRoomer features */}
                <Container sx={{marginTop: "3%"}}>
                    <Container>
                        <Typography align="center" variant="h4">
                            Looking for an A-grade Dog Groomer?
                        </Typography> 
                        {/* Feature Items */}
                        <Stack direction="column" spacing={3} sx={{marginTop: "2%"}}>
                            <Stack direction="row" spacing={1}>
                                <FeatureBox
                                    title="POOCH PERFECT"
                                    content="HelloDoggo: Where Pampering Paws Meet Passionate Groomers! Trust your beloved pet with the best in the business."
                                />
                                <FeatureBox
                                    title="Varying serice levels"
                                    content="HelloDoggo offers tailored grooming experiences with varying service levels to meet your pet's unique needs."
                                />
                            </Stack>
                            <Stack direction="row" spacing={1}>
                                <FeatureBox
                                    title="Easy to book"
                                    content="HelloDoggo makes grooming hassle-free! Our easy-to-use platform allows you to book grooming services with just a few clicks."
                                />
                                <FeatureBox
                                    title="Peace of mind"
                                    content="At HelloDoggo! Our trusted and professional groomers provide top-notch care, ensuring your pet is in safe hands."
                                />
                            </Stack>
                        </Stack>
                    </Container>
                    {/*Divider*/}
                    <div style={{
                        "width": "1286px",
                        "marginTop": "3%",
                        "marginBottom": "3%",
                    }}
                        >
                        <svg width="1286" height="2" viewBox="0 0 1286 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 1.00012L1286 1.00001" stroke="#BDBDBD" stroke-width="2"/>
                        </svg> 
                    </div>
                </Container>
                
                {/* How grooming works*/}
                <Container sx={{
                        "marginBottom": "2%",
                }}>
                    <Typography align="center" sx={{
                        "color": "#FFB300",
                        "fontSize": "48px",
                        "fontStyle": "normal",
                        "fontWeight": 700,
                        "lineHeight": "normal",
                        "letterSpacing": "1.44px",
                    }}>
                        How Does Dog Grooming Works?
                    </Typography> 
                    <Stack direction="row" useFlexGap={true} spacing={20} justifyContent="center">
                        <StepDescription
                            number={1}
                            title="Find a Groomer"
                            content="Confirm and pay to secure your booking ahead of time"
                        />
                        <StepDescription
                            number={2}
                            title="Tame their Tresses"
                            content="Choose from a tidy-up trim to a full top-to-tail treatment"
                        />
                        <StepDescription
                            number={3}
                            title="Repeat when ready"
                            content="Book their next groom to keep them looking furbulous"
                        />
                    </Stack>
                </Container>

                
            </Box>

{/*        <Box
            style={{
                minHeight: "50vw",
                backgroundImage: "url(\"/Images/grooming-banner.jpg\")",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",

            }}
        >
*/}        
        {/*</Box>*/}
    </Box>
  );
}

export default Grooming;