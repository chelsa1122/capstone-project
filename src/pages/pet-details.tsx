import urls from "@/constants/urls";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  Hidden,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import axios from "axios";
import Router from "next/router";
import { useState } from "react";

function PetDetails() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  const canadianProvinces = [
    "Alberta",
    "British Columbia",
    "Manitoba",
    "New Brunswick",
    "Newfoundland and Labrador",
    "Northwest Territories",
    "Nova Scotia",
    "Nunavut",
    "Ontario",
    "Prince Edward Island",
    "Quebec",
    "Saskatchewan",
    "Yukon",
  ];

  const canadianCities = {
    Alberta: ["Calgary", "Edmonton", "Red Deer", "Lethbridge", "Medicine Hat"],
    "British Columbia": [
      "Vancouver",
      "Victoria",
      "Kelowna",
      "Burnaby",
      "Surrey",
    ],
    Manitoba: [
      "Winnipeg",
      "Brandon",
      "Steinbach",
      "Thompson",
      "Portage la Prairie",
    ],
    "New Brunswick": [
      "Moncton",
      "Saint John",
      "Fredericton",
      "Dieppe",
      "Miramichi",
    ],
    "Newfoundland and Labrador": [
      "St. John's",
      "Mount Pearl",
      "Corner Brook",
      "Conception Bay South",
      "Grand Falls-Windsor",
    ],
    "Northwest Territories": [
      "Yellowknife",
      "Hay River",
      "Inuvik",
      "Fort Smith",
      "Behchokǫ",
    ],
    "Nova Scotia": ["Halifax", "Dartmouth", "Sydney", "Truro", "New Glasgow"],
    Nunavut: [
      "Iqaluit",
      "Rankin Inlet",
      "Arviat",
      "Baker Lake",
      "Cambridge Bay",
    ],
    Ontario: ["Toronto", "Ottawa", "Mississauga", "Hamilton", "London"],
    "Prince Edward Island": [
      "Charlottetown",
      "Summerside",
      "Stratford",
      "Cornwall",
      "Kensington",
    ],
    Quebec: ["Montreal", "Quebec City", "Laval", "Gatineau", "Longueuil"],
    Saskatchewan: [
      "Saskatoon",
      "Regina",
      "Prince Albert",
      "Moose Jaw",
      "Swift Current",
    ],
    Yukon: [
      "Whitehorse",
      "Dawson",
      "Watson Lake",
      "Haines Junction",
      "Carmacks",
    ],
  };

  const years = Array.from({ length: 100 }, (_, index) => `${2023 - index}`);
  const months = Array.from({ length: 12 }, (_, index) => `${index + 1}`);
  const days = Array.from({ length: 31 }, (_, index) => `${index + 1}`);

  const [name, setName] = useState("");
  const [dob, setDob] = useState({
    year: "",
    month: "",
    day: "",
  });
  const [weight, setWeight] = useState("");

  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const handleStateChange = (event: { target: { value: any } }) => {
    const newState = event.target.value;
    setSelectedState(newState);
    setSelectedCity("");
  };

  return (
    <Grid container>
      <Grid
        component="form"
        onSubmit={async (e) => {
          e.preventDefault();

          const res = await axios.post(`${urls.apiHost}/createPetDetail`, {
            name: name,
            dob: `${dob.year}-${dob.month}-${dob.day}`,
            weight: 180,
          });
          res.status === 201 && Router.push("/");
        }}
        item
        md={6}
        xs={12}
      >
        <Stack p={matches ? 10 : 2}>
          <Typography fontWeight="bold" mt={4} variant="h4">
            Hello User, Welcome To HelloDoGGo!
          </Typography>
          <Typography variant="body1" color="#757575" letterSpacing={0.5}>
            Help us get to know you by telling us a bit about your loving Pet.
          </Typography>

          <Stack>
            <Typography mt={matches ? 3 : 2}>
              What brings you to HelloDogGo?
              <span style={{ color: "#424242" }}>(Select all that apply)</span>
            </Typography>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Salon and Grooming"
              />
              <FormControlLabel
                control={<Checkbox />}
                label="To make friends"
              />
              <FormControlLabel control={<Checkbox />} label="Events" />
            </FormGroup>
          </Stack>

          <Stack mt={2} spacing={matches ? 2 : 1}>
            <Typography>Pet Name</Typography>
            <TextField
              onChange={(e) => {
                setName(e.target.value);
              }}
              label="Enter pet's name"
              variant="outlined"
            />

            <Typography>State</Typography>
            <Select
              label="Select State"
              variant="outlined"
              onChange={handleStateChange}
            >
              {canadianProvinces.map((province, index) => (
                <MenuItem key={index} value={province}>
                  {province}
                </MenuItem>
              ))}
            </Select>
            <Typography>City</Typography>
            <Select
              label="Select City"
              variant="outlined"
              value={selectedCity}
              onChange={(event) => setSelectedCity(event.target.value)}
            >
              {selectedState &&
                canadianCities[selectedState].map((city, index) => (
                  <MenuItem key={index} value={city}>
                    {city}
                  </MenuItem>
                ))}
            </Select>

            <Typography>Birthday</Typography>

            <Stack
              spacing={matches ? 3 : 1}
              direction={matches ? "row" : "column"}
            >
              <Select
                placeholder="Select Year"
                variant="outlined"
                onChange={(e) =>
                  setDob({
                    ...dob,
                    year: e.target.value,
                  })
                }
                fullWidth={!matches}
              >
                {years.map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </Select>
              <Select
                placeholder="Select Month"
                variant="outlined"
                onChange={(e) =>
                  setDob({
                    ...dob,
                    month: e.target.value,
                  })
                }
                fullWidth={!matches}
              >
                {months.map((month) => (
                  <MenuItem key={month} value={month}>
                    {month}
                  </MenuItem>
                ))}
              </Select>
              <Select
                onChange={(e) =>
                  setDob({
                    ...dob,
                    day: e.target.value,
                  })
                }
                placeholder="Select Day"
                variant="outlined"
                fullWidth={!matches}
              >
                {days.map((day) => (
                  <MenuItem key={day} value={day}>
                    {day}
                  </MenuItem>
                ))}
              </Select>
            </Stack>
            <FormControl component="fieldset">
              <Typography component="legend">Gender</Typography>
              <RadioGroup row name="gender">
                {["male", "female"].map((gender) => (
                  <FormControlLabel
                    key={gender}
                    value={gender}
                    control={<Radio />}
                    label={gender}
                  />
                ))}
              </RadioGroup>
            </FormControl>

            <Typography>Breed</Typography>
            <TextField label="Enter pet's breed" variant="outlined" />
          </Stack>
          <Button
            type="submit"
            sx={{
              marginTop: 2,
            }}
            variant="contained"
            color="primary"
          >
            Finish
          </Button>
        </Stack>
      </Grid>
      <Hidden mdDown>
        <img
          style={{
            position: "absolute",
            bottom: -50,
            right: 0,
            height: "100%",
            zIndex: -1,
          }}
          alt="petdetails"
          src="/Images/petdetails.svg"
        />
      </Hidden>
    </Grid>
  );
}

export default PetDetails;
