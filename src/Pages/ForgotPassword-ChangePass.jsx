import React from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import expenseTrack from "../assets/Expense-2.png";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { url } from "../Api/Api";
import axios from "axios";
import { Spin } from "antd";
import { useState } from "react";

const fieldValidationSchema = yup.object({
  password: yup
    .string()
    .min(8, "enter 8 digit password")
    .required("Please enter the password"),
  confirm_password: yup
    .string()
    .required("Please re-type your password")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const ForgotPasswordChangePass = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const { handleBlur, handleChange, errors, values, touched, handleSubmit } =
    useFormik({
      initialValues: {
        password: "",
        confirm_password: "",
      },
      validationSchema: fieldValidationSchema,
      onSubmit: async () => {
        try {
          setLoading(true);
          const value = {
            password: values.password,
            token: localStorage.getItem("resetAuth"),
          };
          const { data, status } = await axios.put(
            `${url}/forgot-pass/forgot-changePass`,
            value
          );
          if (status === 200) {
            setLoading(false);
            toast({
              description: data.data,
              status: "success",
              duration: 1500,
              position: "top-right",
              isClosable: true,
            });
            navigate("/");
            localStorage.removeItem("resetAuth");
          }
        } catch (error) {
          console.log(error);
          toast({
            description:error.response.data.data,
            status: 'success',
            duration: 1500,
            position: "top-right",
            isClosable: true,
          });
        }
      },
    });

  useEffect(() => {
    const Auth = localStorage.getItem("resetAuth");
    if (!Auth) {
      navigate("/forgot-email-verify");
    }
  }, []);

  return (
    <>
    <Spin spinning={loading}  size='large'> 
      <Box
        style={{
          backgroundImage: "linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)",
        }}
        height="100vh"
        display={"grid"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Box backgroundColor={"white"} p={8} borderRadius={10} width={350}>
          <Box display={"flex"} justifyContent={"center"} mb={0}>
            <Image src={expenseTrack} alt="logo" w={200} h={150} />
          </Box>
          <Box mt={3}>
            <form onSubmit={handleSubmit}>
              <FormControl>
                <FormLabel>Password</FormLabel>
                <InputGroup size="md">
                  <Input
                    type={show ? "text" : "password"}
                    name="password"
                    id="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                      {show ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                {errors.password && touched.password ? (
                  <div style={{ color: "crimson" }}>{errors.password}</div>
                ) : (
                  <></>
                )}
                <FormLabel>confirm-Password</FormLabel>
                <Input
                  type={show ? "text" : "password"}
                  name="confirm_password"
                  id="confirm_password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.confirm_password}
                />
                {errors.confirm_password && touched.confirm_password ? (
                  <div style={{ color: "crimson" }}>
                    {errors.confirm_password}
                  </div>
                ) : (
                  <></>
                )}
                <Box display={"flex"} justifyContent={"center"} mt={3}>
                  <Button
                    style={{
                      backgroundColor: "rgb(232,113,33)",
                      color: "#000",
                      fontWeight: "bold",
                    }}
                    type="submit"
                  >
                    Sign in
                  </Button>
                </Box>
              </FormControl>
            </form>
          </Box>
        </Box>
      </Box>
      </Spin>
    </>
  );
};

export default ForgotPasswordChangePass;
