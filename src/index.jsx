import { createRoot } from "react-dom/client";

import { MainView } from './components/MainView/MainView';

import "./index.scss";
import Container from "react-bootstrap/Container";

const MyFlixApplication = () => {
  return (
    <Container className="main-content">
      <MainView />
    </Container>
  );
};

const container = document.querySelector("#root");
const root = createRoot(container);

root.render(<MyFlixApplication />);