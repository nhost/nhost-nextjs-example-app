import React, { useState } from "react";
import styled from "styled-components";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

const INSERT_AD = gql`
  mutation insertAd($ad: ads_insert_input!) {
    insert_ads_one(object: $ad) {
      id
    }
  }
`;

const NewAdContainer = styled.div``;

export function NewAd(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("");

  const [insertAd] = useMutation(INSERT_AD);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await insertAd({
      variables: {
        ad: {
          title,
          description,
          price,
          currency,
        },
      },
    });

    setTitle("");
    setDescription("");
    setPrice("");
    setCurrency("");

    alert("Ad created");
  };

  return (
    <NewAdContainer>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <textarea
            placeholder="Description"
            rows="5"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Currency"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          />
        </div>
        <button>Create ad</button>
      </form>
    </NewAdContainer>
  );
}
