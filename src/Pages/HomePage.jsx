import {
  Box,
  Button,
  FormLabel,
  HStack,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import Navbar from "../Components/Navbar";
import { useNavigate } from "react-router-dom";
import AddExpenses from "../Components/AddExpenses";
import { useState } from "react";
import axios from "axios";
import { url } from "../Api/Api";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { DatePicker } from "antd";
import moment from "moment";
import {UnorderedListOutlined, AreaChartOutlined} from "@ant-design/icons";
import Analytics from "../Components/Analytics";
import nodata from "../assets/nodata.json";
import Lottie from "lottie-react";
import { Spin } from "antd";

const { RangePicker } = DatePicker;

const HomePage = () => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [selectrange, setSelectRange] = useState([]);
  const [interval, setInterval] = useState("7");
  const [type, setType] = useState("all");
  const [isOpen, setIsOpen] = useState(false);
  const [editOpen,setEditOpen]=useState(false);
  const [viewType, setViewType] = useState("table");
  const [transactionsData, setTransactionsData] = useState([]);
  const [editData,setEditData]=useState(null);

  const handleOpen = () => {
    setIsOpen(true);
    setEditOpen(true)
  };

  const handleClose = () => {
    setIsOpen(false);
    setEditData(null);
  };

  const get_All_Transaction = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("AuthToken");
      const { data, status } = await axios.post(
        `${url}/transaction/get_all_transaction`,
        interval === "custom"
          ? { token: token, selectrange: selectrange, interval: interval, type }
          : { token: token, interval: interval, type }
      );
      if (status === 200) {
        setLoading(false);
        setData(data.data);
        setTransactionsData(data.data)
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTransaction = async (e) => {
    try {
      setLoading(true);
      const { data, status } = await axios.delete(
        `${url}/transaction/delete_transaction/${e}`
      );
      if (status === 200) {
        setLoading(false);
        get_All_Transaction();
        toast({
          description: data.data,
          status: "success",
          duration: 1500,
          position: "top-right",
          isClosable: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    get_All_Transaction();
    const token = localStorage.getItem("AuthToken");
    if (!token) {
      navigate("/");
    }
    
  }, [interval, selectrange, type]);

  return (
    <>
       <Spin spinning={loading}  size='large'>
      <Navbar>
        <Box
          p={5}
          border={"1px solid black"}
          mt={100}
          ml={{ sm: 0, md: 0, lg: 0, xl: 20 }}
          mr={{ sm: 0, md: 0, lg: 0, xl: 20 }}
          boxShadow={"rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"}
          borderRadius={10}
        >
          <Box
            border={"1px solid black"}
            p={2}
            alignItems={"center"}
            display={"flex"}
            justifyContent={"space-between"}
            borderRadius={7}
            style={{ overflowX: "scroll"}}
          >
            <Box>
              <HStack spacing={3}>
                <Box>
                  <FormLabel>Select Frequency</FormLabel>
                  <Select
                    value={interval}
                    onChange={(e) => setInterval(e.target.value)}
                  >
                    <option value="7">Last 1 Week</option>
                    <option value="30">Last 1 Month</option>
                    <option value="365">Last 1 Year</option>
                    <option value="custom">Custom</option>
                  </Select>
                  {interval === "custom" ? (
                    <Box mt={2}>
                      <RangePicker
                        value={selectrange}
                        onChange={(values) => setSelectRange(values)}
                      />
                    </Box>
                  ) : (
                    <></>
                  )}
                </Box>
                <Box>
                  <FormLabel>Select Type</FormLabel>
                  <Select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  >
                    <option value="all">All</option>
                    <option value="expense">Expense</option>
                    <option value="income">Income</option>
                  </Select>
                </Box>
              </HStack>
            </Box>
            <Box>
              <HStack className="homepage-header">
                <Box  border={"1px solid black"} p={2.5} borderRadius={4}>
               <HStack spacing={5}>
               <UnorderedListOutlined  className={`mx-3 ${
                  viewType === "table" ? "active-icon" : "inactive-icon"
                } `}
                onClick={() => setViewType("table")}
                size={30} />
                < AreaChartOutlined  className={`${
                  viewType === "analytics" ? "active-icon" : "inactive-icon"
                } `}
                onClick={() => setViewType("analytics")}
                size={30} />
               </HStack>
                </Box>
                <Box>
                  <Button onClick={handleOpen} variant={"none"} backgroundColor={"rgb(141,217,233)"}>Add New</Button>
                  <AddExpenses isOpen={isOpen} onClose={handleClose} editData={editData} />
                </Box>
              </HStack>
            </Box>
          </Box>

          <Box>
        {data.length !== 0 ? viewType === "table" ? (
          <Box >
            <TableContainer>
            <Table>
              <Thead>
                <Tr>
                  <Th>Date</Th>
                  <Th>Reference</Th>
                  <Th>Description</Th>
                  <Th>Amount</Th>
                  <Th>Type</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data.map((val, index) => (
                  <Tr key={index}>
                    <Td>{moment(val.date).format("yyyy-MM-DD")}</Td>
                    <Td>{val.reference}</Td>
                    <Td>{val.description}</Td>
                    <Td>{val.amount}</Td>
                    <Td>{val.type}</Td>
                    <Td>
                      <HStack spacing={5}>
                        <EditIcon
                          cursor={"pointer"}
                          onClick={() => [setIsOpen(true),setEditData(val)]}
                        />
                        <DeleteIcon
                          cursor={"pointer"}
                          onClick={() => deleteTransaction(val._id)}
                        />
                      </HStack>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
          </Box>
        ) : (
          <Analytics transactions={transactionsData} />
        ) :  <Lottie
        style={{ height: "350px" }}
        animationData={nodata}
        loop={true}
      /> }
          </Box>
        </Box>,
        
      </Navbar>
      </Spin>
    </>
  );
};

export default HomePage;
