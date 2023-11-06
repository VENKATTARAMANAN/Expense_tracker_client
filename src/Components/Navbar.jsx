import {
  Avatar,
  Box,
  Button,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import React from "react";
import expenseTrack from "../assets/Expense-1.png";
import { useNavigate } from "react-router-dom";

const Navbar = ({ children}) => {
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.removeItem("AuthToken");
    localStorage.removeItem("Name");
    navigate("/");
  };

  const name=localStorage.getItem("Name");

  return (
    <>
      <Box
        height="80px"
        bgColor="white"
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        position="fixed"
        top={0}
        zIndex={100}
        boxShadow={"rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"}
        w="100vw"
      >
        <Box>
          <Image src={expenseTrack} alt="logo" width="250px" height="250px" />
        </Box>

        <Box marginRight="30px" cursor={"pointer"}>
          <Menu>
            <MenuButton as={Button} p={0} borderRadius="30px">
              <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
            </MenuButton>
            <MenuList
              mt={5}
              boxShadow={"rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"}
            >
              <MenuItem>Welcome,{name}</MenuItem>
              <MenuItem onClick={() => logOut()}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Box>
      <Box p={4}>{children}</Box>
    </>
  );
};

export default Navbar;
