import React from "react";
import styled from "styled-components";
import { ProtectRoute } from "../context/auth";
import { Header } from "../components/header";
import { NewAd } from "../components/new-ad";
import { MyAds } from "../components/my-ads";

const DashboardContainer = styled.div``;

function Dashboard(props) {
  return (
    <DashboardContainer>
      <Header />
      <h1>Dashboard</h1>
      <div>
        <h2>Add ad</h2>
        <NewAd />
      </div>
      <div>
        <h2>My ads</h2>
        <MyAds />
      </div>
    </DashboardContainer>
  );
}

export default ProtectRoute(Dashboard);
