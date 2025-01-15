import Calendar from "./components/Calendar";
import MainLayer from "./layers/MainLayer";
import Header from "./components/Header";
import {CalendarProvider} from "./contexts/CalendarContext.tsx";

function App() {
  return (
    <MainLayer>
      <Header/>
      <CalendarProvider>
        <Calendar/>
      </CalendarProvider>
    </MainLayer>
  )
}

export default App
