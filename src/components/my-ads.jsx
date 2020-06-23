import React, { useState } from "react";
import styled from "styled-components";
import { useSubscription, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

const S_GET_MY_ADS = gql`
  subscription {
    ads {
      id
      title
      description
      price
      currency
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
  const { loading, data } = useSubscription(S_GET_MY_ADS);
  const [deleteAd] = useMutation(DELETE_AD);

  console.log({ loading });
  // console.log({ data });

  if (loading && !data) {
    return <div>Loading..</div>;
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
            {ad.title} <span onClick={() => removeAd(ad.id)}>[delete]</span>
          </li>
        );
      })}
    </MyAdsContainer>
  );
}
