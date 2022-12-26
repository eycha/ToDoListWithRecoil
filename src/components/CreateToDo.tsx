import {useForm} from "react-hook-form";
import {useSetRecoilState} from "recoil";
import {toDoState, Categories} from "../atoms";

interface IForm {
  toDo: string;
}

function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState);
  // const category = useRecoilValue(categoryState);
  const {register, handleSubmit, setValue} = useForm<IForm>();
  const handleValid = ({toDo}: IForm) => {
    setToDos((oldToDos) => [
      {text: toDo, id: Date.now(), category: Categories.TO_DO},
      ...oldToDos,
    ]);
    setValue("toDo", "");
  };
  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <input
        {...register("toDo", {
          required: "Please write a To Do",
        })}
        placeholder="Write a to do"
      />
      <button>Add</button>
    </form>
  );
}

export default CreateToDo;
