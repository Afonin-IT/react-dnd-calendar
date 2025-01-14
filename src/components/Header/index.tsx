import {headerStyles, logoStyles} from "./style.ts";
import Search from "../Search";

function Header() {
  return <div css={headerStyles}>
    <h1 css={logoStyles}>Calendar</h1>

    <Search />
  </div>
}

export default Header;