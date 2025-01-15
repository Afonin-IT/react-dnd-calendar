import {cardStyle, colorStyle, editTaskStyle, textareaStyle} from "./style.ts";
import {Task, TaskType} from "../../interfaces";
import IconButton from "../IconButton";
import {ChangeEvent, useContext, useEffect, useRef, useState} from "react";
import {useTaskStore} from "../../store/taskStore.ts";
import {CalendarContext} from "../../contexts/CalendarContext.tsx";

interface Props {
  task: Task
}

const EditTaskCard = ({task}: Props) => {
  const {setEditingTask} = useContext(CalendarContext)
  const {update} = useTaskStore()
  const [name, setName] = useState(task.name);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleChangeName = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length < 100) {
      setName(e.target.value)
    }
  }

  const handleUpdate = () => {
    update(task.id, { name })
    setEditingTask(null);
  }

  const handleCancel = () => {
    if (name !== task.name) {
      if (window.confirm("Are you sure you want to discard the changes?")) {
        setEditingTask(null)
      }
    } else {
      setEditingTask(null)
    }
  }

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
      const length = textareaRef.current.value.length;
      textareaRef.current.setSelectionRange(length, length);
    }
  }, [textareaRef]);


  useEffect(() => {
    adjustHeight()
  }, [name]);

  return <div css={[cardStyle, editTaskStyle]}>
    <div className="content">
      <div css={colorStyle(TaskType.Task)}></div>

      <textarea css={textareaStyle}
                defaultValue={name}
                rows={1}
                onChange={handleChangeName}
                ref={textareaRef}>
      </textarea>
    </div>
    <div className="actions">
      <IconButton onClick={handleUpdate} type={'checkmark'} />
      <IconButton onClick={handleCancel} type={'close'} />
    </div>
  </div>
}

export default EditTaskCard;