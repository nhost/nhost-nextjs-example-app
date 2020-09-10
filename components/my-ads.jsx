import React, { useState } from "react";
import styled from "styled-components";
import { useSubscription, useMutation } from "@apollo/client";
import gql from "graphql-tag";

const S_GET_MY_ADS = gql`
  subscription {
    ads {
      id
      title
      description
      price
      currency
      user_id
    }
  }
`;

const DELETE_AD = gql`
  mutation deleteAd($id: uuid!) {
    delete_ads_by_pk(id: $id) {
      id
    }
  }
`;

const MyAdsContainer = styled.div``;

export function MyAds() {
  const { loading, data, error } = useSubscription(S_GET_MY_ADS);
  const [deleteAd] = useMutation(DELETE_AD);

  if (loading && !data) {
    return <div>Loading..</div>;
  }

  if (error) {
    console.error(error);
    return <div>Error. Check console log.</div>;
  }

  const removeAd = (id) => {
    deleteAd({
      variables: {
        id,
      },
    });
  };

  return (
    <MyAdsContainer>
      {data.ads.map((ad) => {
        return (
          <li key={ad.id}>
            {ad.title}, user_id: {ad.user_id}{" "}
            <span onClick={() => removeAd(ad.id)}>[delete]</span>
          </li>
        );
      })}
    </MyAdsContainer>
  );
}
