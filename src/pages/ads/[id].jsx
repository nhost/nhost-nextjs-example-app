import { useRouter } from "next/router";
import { graphQLClient } from "lib/graphql";
import styled from "styled-components";
import Head from "next/head";
import { Header } from "components/header";

const PostContainer = styled.div``;

export default function Post(props) {
  const { ad } = props;

  return (
    <PostContainer>
      <Head>
        <title>{ad.title}</title>
        <meta name="description" content={ad.description}></meta>
      </Head>
      <Header />
      <h2>{ad.title}</h2>
      <div>
        <div>{ad.description}</div>
        <div>
          {ad.price} {ad.currency}
        </div>
      </div>
      <div>Back</div>
    </PostContainer>
  );
}

export async function getStaticPaths() {
  // Call an external API endpoint to get posts
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

  const paths = data.ads.map((ad) => `/ads/${ad.id}`);

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const GET_AD = `
    query getAd($id: uuid!) {
      ad: ads_by_pk(id: $id) {
        id
        title
        description
        created_at
        price
        currency
      }
    }
  `;

  const data = await graphQLClient.request(GET_AD, {
    id: params.id,
  });

  const ad = data.ad;

  return { props: { ad } };
}
