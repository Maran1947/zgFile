import Router from "next/router";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import axios from "axios";
import { BASE_URL, endpoints } from "../../helpers/constants/endpoints";
import Link from "next/link";
import { Box } from "@mui/material";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL + endpoints.LOGOUT}`,
        {},
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        Router.push("/signin");
      }
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Something went wrong");
    }
  };
  const handleProfileIcon = () => {
    Router.push("/profile");
  };
  return (
    <Box
      component="nav"
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0rem 5rem",
        '@media (max-width: 600px)':{
          padding: '0rem 1rem'
        }
      }}
    >
      <h1
        style={{
          fontSize: "2.5rem",
          color: "#0070f3",
          cursor: "pointer",
        }}
      >
        <Link style={{ color: "#0070f3", textDecoration: "none" }} href="/">
          zgFile.
        </Link>
      </h1>
      {
        !pathname?.includes('/s/p') &&
        <div
        style={{
          boxShadow: "0px 2px 5px #0000002e",
          borderRadius: "5px",
          padding: "0.2rem 1rem",
        }}
      >
        <AccountCircleIcon
          onClick={handleProfileIcon}
          sx={{
            fontSize: "2rem",
            color: "#ced8e0",
            cursor: "pointer",
            mr: "1rem",
            "&:hover": {
              color: "#4e79ef",
            },
          }}
        />
        <LogoutIcon
          onClick={() => handleLogout()}
          sx={{
            fontSize: "2rem",
            color: "#ced8e0",
            cursor: "pointer",
            "&:hover": {
              color: "#4e79ef",
            },
          }}
        />
      </div>
      }
    </Box>
  );
};

export default Navbar;
