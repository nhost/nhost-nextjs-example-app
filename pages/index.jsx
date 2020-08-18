import styled from "styled-components";
import Head from "next/head";
import Link from "next/link";
import { Header } from "components/header";
import { graphQLClient } from "lib/graphql";

const IndexContainer = styled.div``;

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
