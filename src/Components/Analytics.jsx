import { Box, HStack, Heading, Text } from "@chakra-ui/react";
import { Progress } from "antd";
import React from "react";

const Analytics = ({ transactions }) => {
  const totalTransactions = transactions.length;
  const totalIncomeTransactions = transactions.filter(
    (transaction) => transaction.type === "income"
  );
  const totalExpenceTransactions = transactions.filter(
    (transaction) => transaction.type === "expense"
  );
  const totalIncomeTransactionsPercentage =
    (totalIncomeTransactions.length / totalTransactions) * 100;
  const totalExpenceTransactionsPercentage =
    (totalExpenceTransactions.length / totalTransactions) * 100;

  const totalTurnover = transactions.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );
  const totalIncomeTurnover = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((acc, transaction) => acc + transaction.amount, 0);
  const totalExpenceTurnover = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((acc, transaction) => acc + transaction.amount, 0);
  const totalIncomeTurnoverPercentage =
    (totalIncomeTurnover / totalTurnover) * 100;
  const totalExpenceTurnoverPercentage =
    (totalExpenceTurnover / totalTurnover) * 100;

  const categories = [
    "salary",
    "entertainment",
    "freelance",
    "food",
    "travel",
    "investment",
    "education",
    "medical",
    "tax",
  ];

  return (
    <>
      <Box>
        <Box className="total">
          <Box border={"1px solid black"} p={3} mt={3} borderRadius={5} >
            <Heading fontSize={25}>Total Transaction:{totalTurnover}</Heading>
            <Text style={{ borderTop: " 1px solid black" }}>
              Income:{totalIncomeTurnover}
            </Text>
            <Text>Expense:{totalExpenceTurnover}</Text>
            <Box mt={2} mx={2}>
              <HStack spacing={6}>
                <Progress
                  strokeColor={"green"}
                  type="circle"
                  percent={totalIncomeTurnoverPercentage.toFixed(1)}
                />
                <Progress
                  strokeColor="#E5572F"
                  type="circle"
                  percent={totalExpenceTurnoverPercentage.toFixed(1)}
                />
              </HStack>
            </Box>
          </Box>

          <Box border={"1px solid black"} p={3} mt={3} borderRadius={5}>
            <Heading fontSize={25}>Total TurnOver:{totalTransactions}</Heading>
            <Text style={{ borderTop: " 1px solid black" }}>
              Income:{totalIncomeTransactions.length}
            </Text>
            <Text>Expense:{totalExpenceTransactions.length}</Text>
            <Box mt={2} mx={2}>
              <HStack spacing={6}>
                <Progress
                  strokeColor={"green"}
                  type="circle"
                  percent={totalIncomeTransactionsPercentage.toFixed(1)}
                />
                <Progress
                  strokeColor="#E5572F"
                  type="circle"
                  percent={totalExpenceTransactionsPercentage.toFixed(1)}
                />
              </HStack>
            </Box>
          </Box>
        </Box>
        <hr />
        <Box className="category" border={"1px solid black"} mt={3} p={5} borderRadius={5}>
          <Box width={"50vw"}>
            <Heading fontSize={25}>Expense - Category Wise</Heading>
            {categories.map((category,index) => {
              const amount = transactions
                .filter((t) => t.type == "expense" && t.category === category)
                .reduce((acc, t) => acc + t.amount, 0);
              return (
                amount > 0 && (
                  <Box className="category-card" key={index}>
                    <h5>{category}</h5>
                    <Progress
                      strokeColor="#0B5AD9"
                      percent={((amount / totalExpenceTurnover) * 100).toFixed(
                        0
                      )}
                    />
                  </Box>
                )
              );
            })}
          </Box>
          <Box  width={"50vw"}>
            <Heading fontSize={25}> Income - Category Wise</Heading>
            {categories.map((category,index) => {
              const amount = transactions
                .filter((t) => t.type == "income" && t.category === category)
                .reduce((acc, t) => acc + t.amount, 0);
              return (
                amount > 0 && (
                  <div className="category-card" key={index}>
                    <h5>{category}</h5>
                    <Progress
                      strokeColor="#0B5AD9"
                      percent={((amount / totalExpenceTurnover) * 100).toFixed(
                        0
                      )}
                    />
                  </div>
                )
              );
            })}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Analytics;
