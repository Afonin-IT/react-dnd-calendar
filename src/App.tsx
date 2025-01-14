import Calendar from "./components/Calendar";
import MainLayer from "./layers/MainLayer";
import Header from "./components/Header";

function App() {
  return (
    <MainLayer>
      <Header/>
      <Calendar/>
    </MainLayer>
  )
}

export default App
