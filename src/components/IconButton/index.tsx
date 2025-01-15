import PlusIcon from '../../assets/icon-plus.svg'
import EditIcon from '../../assets/icon-edit.svg'
import CloseIcon from '../../assets/icon-close.svg'
import RemoveIcon from '../../assets/icon-remove.svg'
import CheckmarkIcon from '../../assets/icon-checkmark.svg'
import {iconButtonStyle} from "./style.ts";

type ButtonType = 'plus' | 'remove' | 'edit' | 'close' | 'checkmark';

const icons: Record<ButtonType, string> = {
  'plus': PlusIcon,
  'edit': EditIcon,
  'remove': RemoveIcon,
  'close': CloseIcon,
  'checkmark': CheckmarkIcon,
}

interface Props {
  onClick: () => void
  type: ButtonType
}

function IconButton({ onClick, type }: Props) {
  return <button onClick={onClick} css={iconButtonStyle}>
    <img src={icons[type]} alt=""/>
  </button>
}

export default IconButton