import styled from "styled-components";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import Link from "next/link";
import { useAuth } from "react-nhost";
import { auth } from "lib/nhost";

const HeaderContainer = styled.div`
  .menu-container {
    display: flex;
    flex-direction: row;
  }

  .separator {
    margin: 4px;
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
  const { loading, data } = useQuery(GET_SELF, {
    variables: {
      id: auth.getClaim("x-hasura-user-id"),
    },
  });

  if (loading && !data) {
    return <div>Loading...</div>;
  }

  return <div>{data.self.display_name} (logout)</div>;
}

export function Header(props) {
  const { signedIn } = useAuth();

  function renderUserHeader(signedIn) {
    switch (signedIn) {
      case null:
        return <div>Loading...</div>;
      case false:
        return <div>Not logged in</div>;
      case true:
        return <HeaderSelf />;
    }
  }

  return (
    <HeaderContainer>
      <div className="menu-container">
        <Link href="/">
          <a>Home</a>
        </Link>

        {auth.isAuthenticated() && <div className="separator">|</div>}
        {auth.isAuthenticated() && (
          <Link href="/dashboard">
            <a>Dashboard</a>
          </Link>
        )}
        <div className="separator">|</div>
        <div className="flex flex-fixed">
          {auth.isAuthenticated() ? (
            <Link href="/">
              <a
                onClick={() => {
                  auth.logout();
                }}
              >
                <HeaderSelf />
              </a>
            </Link>
          ) : (
            <Link href="/login">Login</Link>
          )}
        </div>
      </div>
    </HeaderContainer>
  );
}
