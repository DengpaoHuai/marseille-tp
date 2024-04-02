import "./App.css";
import DemoComponent from "./components/DemoComponent";

function App() {
  return (
    <>
      <p>Hello world</p>
      <DemoComponent title="hello" subtitle="I learn React">
        <div>contenu</div>
      </DemoComponent>
    </>
  );
}

export default App;
