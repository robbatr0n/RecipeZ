import { observer } from "mobx-react-lite";
import { Container } from "semantic-ui-react";
import { Outlet } from "react-router-dom";
import ModalContainer from "../common/modals/modalContainer";
import { ToastContainer } from "react-toastify";
import Navbar from "./Navbar";

function App() {
  return (
    <>
      <ModalContainer />
      <ToastContainer position="bottom-right" theme="colored" />
      <Navbar />
      <Container style={{ marginTop: "7em" }}>
        <Outlet />
      </Container>
    </>
  );
}

export default observer(App);
