import {ReactNode} from "react";
import {Layer} from "./style.ts";

interface Props {
  children: ReactNode
}
const MainLayer = ({ children }: Props) => {
  return <Layer>
    {children}
  </Layer>
}

export default MainLayer;