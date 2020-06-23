import styled from "styled-components";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Link from "next/link";
import { auth } from "lib/nhost";

const HeaderContainer = styled.div`
  .top-container {
    display: flex;
  }

  .menu-container {
    display: flex;
  }
`;

const GET_SELF = gql`
  query getSelf($id: uuid!) {
    self: users_by_pk(id: $id) {
      id
      display_name
    }
  }
`;

function HeaderSelf(props) {
  if (!auth.isAuthenticated()) {
    return <div>Not logged in</div>;
  }

  const { loading, data } = useQuery(GET_SELF, {
    variables: {
      id: auth.getClaim("x-hasura-user-id"),
    },
  });

  if (loading && !data) {
    return <div>Loading...</div>;
  }

  return <div>{data.self.display_name}</div>;
}

export function Header(props) {
  return (
    <HeaderContainer>
      <div className="top-container">
        <div>Blocket</div>
        <div>
          <HeaderSelf />
        </div>
      </div>
      <div className="menu-container">
        <Link href="/">
          <a>Home</a>
        </Link>
        <Link href="/dashboard">
          <a>Dashboard</a>
        </Link>
        <a
          onClick={() => {
            auth.logout();
          }}
        >
          Logout
        </a>
      </div>
    </HeaderContainer>
  );
}
