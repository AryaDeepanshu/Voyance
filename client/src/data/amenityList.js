import {
  Kitchen,
  Wifi,
  ChairAlt,
  LocalParking,
  Pets,
  SmokeFree,
  FireExtinguisher,
  LocalHospital,
} from "@mui/icons-material";

export const amenityList = [
  {
    label: "Kitchen",
    icon: <Kitchen style={{ transform: "scale(1.5)", color: "gray" }} />,
  },
  {
    label: "Wifi",
    icon: <Wifi style={{ transform: "scale(1.5)", color: "gray" }} />,
  },
  {
    label: "Workspace",
    icon: <ChairAlt style={{ transform: "scale(1.5)", color: "gray" }} />,
  },
  {
    label: "Parking",
    icon: <LocalParking style={{ transform: "scale(1.5)", color: "gray" }} />,
  },
  {
    label: "Pets Allowed",
    icon: <Pets style={{ transform: "scale(1.5)", color: "gray" }} />,
  },
  {
    label: "Smoke Alarm",
    icon: <SmokeFree style={{ transform: "scale(1.5)", color: "gray" }} />,
  },
  {
    label: "Fire Extinguisher",
    icon: (
      <FireExtinguisher style={{ transform: "scale(1.5)", color: "gray" }} />
    ),
  },
  {
    label: "First Aid kit",
    icon: <LocalHospital style={{ transform: "scale(1.5)", color: "gray" }} />,
  },
];
