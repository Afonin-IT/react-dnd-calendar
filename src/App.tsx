import Calendar from "./components/Calendar";
import MainLayer from "./layers/MainLayer";
import Header from "./components/Header";

function App() {
  // const { holidays, fetchHolidays, isLoading } = useHolidayStore();
  // const {tasks, add, delete: deleteTask} = useTaskStore();

  // const handleAdd = (name: string) => {
  //   const currentDate = dayjs().format('YYYY-MM-DD');
  //
  //   add(currentDate, {
  //     name
  //   });
  // }
  //
  // const handleDelete = (date: string, id: string) => {
  //   deleteTask(date, id)
  // }

  // useEffect(() => {
  //   const year = new Date().getFullYear();
  //
  //   fetchHolidays(year)
  // }, []);

  return (
    <MainLayer>
      <Header/>
      <Calendar/>
    </MainLayer>
  )
}

export default App
