import urls from "@/constants/urls";
import { BreakfastDiningOutlined } from "@mui/icons-material";
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
import { GetServerSidePropsContext } from "next";
import Router from "next/router";
import { useState } from "react";

function PetDetails(props) {
  const { petDetails } = props;
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
  const [name, setName] = useState(petDetails.name);
  const [dob, setDob] = useState({
    year: new Date(petDetails.dob).getFullYear(),
    month: new Date(petDetails.dob).getMonth(),
    day: new Date(petDetails.dob).getDay(),
  });
  const [weight, setWeight] = useState(petDetails.weight);
  const [breed, setBreed] = useState(petDetails.breed);
  const [selectedState, setSelectedState] = useState(petDetails.state);
  const [selectedCity, setSelectedCity] = useState(petDetails.city);
  const [gender, setGender] = useState(petDetails.gender);

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
          // name, dob, weight, state, city, gender, breed
          const res = await axios.put(`${urls.apiHost}/updatePetDetails`, {
            name: name,
            dob: `${dob.year}-${dob.month}-${dob.day}`,
            weight: 180,
            pet_id: petDetails.id,
            city: selectedCity,
            state: selectedState,
            breed,
            gender,
          });
          res.status === 200 && Router.push("/profile");
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
              value={name}
              label="Enter pet's name"
              variant="outlined"
            />

            <Typography>State</Typography>
            <Select
              label="Select State"
              variant="outlined"
              value={selectedState}
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
                value={dob.year}
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
                value={dob.month}
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
                value={dob.day}
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
              <RadioGroup
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                row
                name="gender"
              >
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
            <TextField
              value={breed}
              onChange={(e) => setBreed(e.target.value)}
              label="Enter pet's breed"
              variant="outlined"
            />
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

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { req, params } = context;

  const user = await axios.get(`${urls.apiHost}/check-session`, {
    headers: {
      Cookie: req?.headers.cookie,
    },
  });

  if (!user.data.userData) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  if (user.data.userData) {
    const petDetailsRes = await axios.get(`${urls.apiHost}/getPetDetails`, {
      headers: {
        Cookie: req.headers.cookie,
      },
    });
    const petDetails =
      petDetailsRes.data.find((pet) => pet.id == params.id) || null;
    console.log(petDetailsRes.data);
    if (!petDetails) {
      return {
        redirect: {
          destination: "/profile",
          permanent: false,
        },
      };
    }

    return {
      props: {
        petDetails,
        user: user.data.userData,
      },
    };
  }

  return {
    props: {},
  };
};

export default PetDetails;
