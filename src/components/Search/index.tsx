import {useEffect, useState} from "react";
import {searchStyle} from "./style.ts";
import {useTaskStore} from "../../store/taskStore.ts";

const Search = () => {
  const { setSearchText } = useTaskStore();
  const [value, setValue] = useState("");

  useEffect(() => {
    setSearchText(value)
  }, [value])

  return <div css={searchStyle}>
    <input type="search" onChange={e => setValue(e.target.value)} value={value} placeholder="Search..."/>

    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 50 50">
      <path
        d="M 21 3 C 11.601563 3 4 10.601563 4 20 C 4 29.398438 11.601563 37 21 37 C 24.355469 37 27.460938 36.015625 30.09375 34.34375 L 42.375 46.625 L 46.625 42.375 L 34.5 30.28125 C 36.679688 27.421875 38 23.878906 38 20 C 38 10.601563 30.398438 3 21 3 Z M 21 7 C 28.199219 7 34 12.800781 34 20 C 34 27.199219 28.199219 33 21 33 C 13.800781 33 8 27.199219 8 20 C 8 12.800781 13.800781 7 21 7 Z"></path>
    </svg>
  </div>
}

export default Search;