import {headerStyles, logoStyles} from "./style.ts";

function Header() {
  return <div css={headerStyles}>
    <h1 css={logoStyles}>Calendar</h1>
  </div>
}

export default Header;