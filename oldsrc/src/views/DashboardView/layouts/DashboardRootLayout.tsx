import { Grid, GridItem, Text } from "@chakra-ui/react";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import SideNavBar from "../../../Components/Dashboard/SideNavBar";
import MuSidebar from "../../../Components/MuComponents/MuSidebar/MuSidebar";
import DashboardTopBar from "../components/DashboardTopBar";
import DashboardSidebar from "../components/DashboardSidebar";

const DashboardRootLayout = () => {
  const [title, setTitle] = useState("Dashboard");

  return (
    <Grid
      templateColumns="repeat(12, 1fr)"
      bg="gray.50"
      // p={{ base: "20px", lg: "30px" }}
      gap={6}
      minHeight={{ lg: "100vh" }}
    >
      <GridItem as="aside" colSpan={{ base: 12, lg: 3, xl: 2 }}>
        <DashboardSidebar setTitle={setTitle} />

      </GridItem>

      <GridItem as="main" p={6} colSpan={{ base: 12, lg: 9, xl: 10 }}>
        <DashboardTopBar title={title} />
        <Outlet />
      </GridItem>
    </Grid>
  );
};

export default DashboardRootLayout;
