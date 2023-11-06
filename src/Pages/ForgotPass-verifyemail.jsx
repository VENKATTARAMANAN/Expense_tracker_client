import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Image,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import expenseTrack from "../assets/Expense-2.png";
import { useNavigate } from "react-router-dom";
import { url } from "../Api/Api";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";
import { Spin } from "antd";

const formvalidate = yup.object({
  email: yup.string().required("Please enter the email"),
});

const ForgotPassVerifyEmail = () => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { handleSubmit, handleBlur, handleChange, values, errors, touched } =
    useFormik({
      initialValues: {
        email: "",
      },
      validationSchema: formvalidate,
      onSubmit: async () => {
        try {
          setLoading(true);
          const { data, status } = await axios.post(
            `${url}/forgot-pass/forpass-verify-mail`,
            values
          );
          if (status === 200) {
            setLoading(false);
            toast({
              description: data.data.message,
              status: "success",
              duration: 1500,
              position: "top-right",
              isClosable: true,
            });
            localStorage.setItem("resetAuth", data.data.token);
            navigate("/forgot-otp-verify")
          }
         
        } catch (error) {
          console.log(error);
          toast({
            description:error.response.data.data,
            status: 'success',
            duration: 1500,
            position: "top-right",
            isClosable: true,
          })
        }
      },
    });

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
        <Box backgroundColor={"white"} p={5} borderRadius={10} width={350}>
          <Box display={"flex"} justifyContent={"center"} mb={0}>
            <Image src={expenseTrack} alt="logo" w={200} h={150} />
          </Box>
          <Box>
            <Text>
              Enter the email address associated with your Expense Tracker.
            </Text>
          </Box>
          <Box mt={3}>
            <form onSubmit={handleSubmit}>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  value={values.email}
                  name="email"
                  id="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.email && touched.email ? (
                  <div style={{ color: "crimson" }}>{errors.email}</div>
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
                    Continue
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

export default ForgotPassVerifyEmail;
