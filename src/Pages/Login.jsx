import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import loginlottie from "../assets/login-lottie.json";
import Lottie from "lottie-react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { url } from "../Api/Api";
import { useState } from "react";
import { Spin } from "antd";

const formvalidate = yup.object({
  email: yup.string().required("Please enter the email"),
  password: yup
    .string()
    .required("Please enter the password")
    .min(8, "Please enter the 8 digit password"),
});
const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const { values, handleBlur, handleChange, handleSubmit, touched, errors } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: formvalidate,
      onSubmit: async () => {
        try {
          setLoading(true);
          const { data, status } = await axios.post(
            `${url}/user/signin`,
            values
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
            navigate("/homepage");
            localStorage.setItem("AuthToken", data.token);
            localStorage.setItem("Name",data.name);
          }
        } catch (error) {
          console.log(error);
          toast({
            description: error.response.data.data,
            status: "success",
            duration: 1500,
            position: "top-right",
            isClosable: true,
          });
        }
      },
    });

  useEffect(() => {
    const token = localStorage.getItem("AuthToken");
    if (token) {
      navigate("/homepage");
    }
  }, []);

  return (
    <>
      <Spin spinning={loading}  size='large'>
        <Box
          style={{
            backgroundImage:
              "linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)",
          }}
          height="100vh"
          gap={10}
          display={"grid"}
          gridTemplateColumns={"auto auto"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <div className="lottie-image">
            <Lottie
              style={{ height: "350px" }}
              animationData={loginlottie}
              loop={true}
            />
          </div>
          <Box
            ml={10}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <form onSubmit={handleSubmit}>
              <Heading textAlign={"center"} fontSize={30} mb={5}>
                Expense Tracker-Login
              </Heading>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  width="350px"
                />
                {errors.email && touched.email ? (
                  <div style={{ color: "crimson" }}>{errors.email}</div>
                ) : (
                  <></>
                )}
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  width="350px"
                />
                {errors.password && touched.password ? (
                  <div style={{ color: "crimson" }}>{errors.password}</div>
                ) : (
                  <></>
                )}
                <Box mt={5}>
                  {" "}
                  <Button type="submit" w={"100%"}>
                    Sign In
                  </Button>
                </Box>
                <Box>
                  <Box textDecoration={"underline"}>
                    <Link to="/forgot-email-verify">Forgot password?</Link>
                  </Box>
                  <Box textDecoration={"underline"}>
                    <Link to="/signup">Don't have an account? Register</Link>
                  </Box>
                </Box>
              </FormControl>
            </form>
          </Box>
        </Box>
      </Spin>
    </>
  );
};

export default Login;
