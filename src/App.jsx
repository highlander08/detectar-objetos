import "./App.css";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const App = () => {
  return (
    <Container>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Link to="/signin" style={{textDecoration: 'none', marginLeft: 20, color: 'black', fontSize: 50}}>Fazer Login</Link>
      </div>
      
      {/* <Link to="/sobre">Autenticação</Link> */}
    </Container>
  );
};
