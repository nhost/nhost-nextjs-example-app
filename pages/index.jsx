import styled from "styled-components";
import Head from "next/head";
import Link from "next/link";
import { useSubscription } from "@apollo/client";
import { Header } from "components/header";
import { graphQLClient } from "lib/graphql";
import gql from "graphql-tag";

const IndexContainer = styled.div``;

const S_GET_ADS = gql`
  subscription {
    ads {
      id
      title
    }
  }
`;

function SubscriptionTest() {
  const { loading, error, data } = useSubscription(S_GET_ADS);

  console.log({ loading, error, data });

  return <div>SubscriptionTest component</div>;
}

export function Index(props) {
  return (
    <IndexContainer>
      <Head>
        <title>Ads</title>
      </Head>
      <Header />
      <div>
        <h2>Ads</h2>
        <ul>
          {props.ads.map((ad) => {
            return (
              <li key={ad.id}>
                <Link href="/ads/[id]" as={`/ads/${ad.id}`}>
                  <a>{ad.title}</a>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <SubscriptionTest />
    </IndexContainer>
  );
}

export default Index;

export async function getStaticProps(context) {
  const GET_ADS = `
    query {
      ads {
        id
        title
        created_at
        description
      }
    }
  `;

  const data = await graphQLClient.request(GET_ADS);

  return {
    props: {
      ads: data.ads,
    },
  };
}
