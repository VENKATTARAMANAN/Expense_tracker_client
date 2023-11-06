import React, { useEffect } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { url } from "../Api/Api";
import { Spin } from "antd";
import { useState } from "react";

const formvalidate = yup.object({
  amount: yup.number().required("Please enter the amount"),
  date: yup.date().required("Please select date"),
  reference: yup.string().required("Please enter the reference"),
  description: yup.string().required("Please enter the description"),
});

const AddExpenses = ({ isOpen, onClose, editData }) => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const {
    values,
    setValues,
    handleChange,
    handleSubmit,
    touched,
    errors,
    handleBlur,
  } = useFormik({
    initialValues: {
      userid: localStorage.getItem("AuthToken"),
      amount: "",
      type: "income",
      category: "salary",
      date: "",
      reference: "",
      description: "",
    },
    validationSchema: formvalidate,
    onSubmit: async () => {
      try {
        setLoading(true);
        onClose(true);
       if(editData !== null){
        const { data, status } = await axios.post(
          `${url}/transaction/edit_transaction`,
          values
        );
        if (status === 200) {
          setLoading(false);
          window.location.reload();
          toast({
            description: data.data,
            status: "success",
            duration: 1500,
            position: "top-right",
            isClosable: true,
          });
        }
        values.amount = " ";
        values.date = " ";
        values.reference = " ";
        values.description = " ";
       }else{
        setLoading(true);
        const { data, status } = await axios.post(
          `${url}/transaction/add_transaction`,
          values
        );
        if (status === 200) {
          setLoading(false);
          window.location.reload();
          toast({
            description: data.data,
            status: "success",
            duration: 1500,
            position: "top-right",
            isClosable: true,
          });
        }
        values.amount = " ";
        values.date = " ";
        values.reference = " ";
        values.description = " ";
       }
       
      } catch (error) {
        console.log(error);
      }
    },
  });

  useEffect(() => {
    editData !== null ? setValues(editData) : <></>;
  }, [editData]);

  return (
    <>
     <Spin spinning={loading}  size='large'>
      <Modal isOpen={isOpen} onClose={()=>(onClose(true),setValues({
      userid: localStorage.getItem("AuthToken"),
      amount: "",
      type: "income",
      category: "salary",
      date: "",
      reference: "",
      description: "",
    }))}>
        <ModalOverlay />
        <ModalContent>
          {editData !== null ? (
            <ModalHeader>Edit Transaction</ModalHeader>
          ) : (
            <ModalHeader>Add Transaction</ModalHeader>
          )}
          <ModalCloseButton />
          <form onSubmit={handleSubmit}>
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Amount</FormLabel>
                <Input
                  type="number"
                  name="amount"
                  id="amount"
                  value={values.amount}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Amount"
                />
                {errors.amount && touched.amount ? (
                  <div style={{ color: "crimson" }}>{errors.amount}</div>
                ) : (
                  <></>
                )}
              </FormControl>
              <FormControl mt={2}>
                <FormLabel>Type</FormLabel>
                <Select
                  name="type"
                  id="type"
                  value={values.type}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </Select>
              </FormControl>
              <FormControl mt={2}>
                <FormLabel>Catogery</FormLabel>
                <Select
                  name="category"
                  id="category"
                  value={values.category}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option value="salary">Salary</option>
                  <option value="freelance">Freelance</option>
                  <option value="food">Food</option>
                  <option value="entertainment">Entertainment</option>
                  <option value="investment">Investment</option>
                  <option value="travel">Travel</option>
                  <option value="education">Education</option>
                  <option value="medical">Medical</option>
                  <option value="tax">Tax</option>
                </Select>
              </FormControl>
              <FormControl mt={2}>
                <FormLabel>Date</FormLabel>
                <Input
                  type="date"
                  name="date"
                  id="date"
                  value={values.date}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.date && touched.date ? (
                  <div style={{ color: "crimson" }}>{errors.date}</div>
                ) : (
                  <></>
                )}
              </FormControl>
              <FormControl mt={2}>
                <FormLabel>Reference</FormLabel>
                <Input
                  type="text"
                  name="reference"
                  id="reference"
                  value={values.reference}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.reference && touched.reference ? (
                  <div style={{ color: "crimson" }}>{errors.reference}</div>
                ) : (
                  <></>
                )}
              </FormControl>
              <FormControl mt={2}>
                <FormLabel>Description</FormLabel>
                <Textarea
                  name="description"
                  id="description"
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.description && touched.description ? (
                  <div style={{ color: "crimson" }}>{errors.description}</div>
                ) : (
                  <></>
                )}
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} type="submit">
                Save
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
      </Spin>
    </>
  );
};

export default AddExpenses;
