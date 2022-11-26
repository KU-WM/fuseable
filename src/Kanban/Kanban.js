import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useRecoilState, useRecoilValue } from "recoil";
import { kanbanListState } from "../recoil";
import AddList from "./AddList";
import EditList from "./EditList";
import KanbanList from "./KanbanList";
import './Kanban.css';
import { useEffect } from "react";
import axios from "axios";


function Kanban() {
  const kanbanList = useRecoilValue(kanbanListState)
  const [kanbanListSet, setKanbanListSet] = useRecoilState(kanbanListState);
  const userCode = window.localStorage.getItem("userCode");
  const selectedProjectId = window.localStorage.getItem("selectedProjectId");

  useEffect(() => {(async() => {
    {try {
      const res = await axios
      .get(
        `http://localhost:8080/api/project/${userCode}/${selectedProjectId}`
      )
      .then((response) => 
      {
        setKanbanListSet(clearData(kanbanListSet));
        (response.data.note).map((data) => {
          return setKanbanListSet((oldKanbanList) => [
            ...oldKanbanList,
            {
              id: data.noteId,
              title: ' ',
              content: ' ',
              deadline: ' ',
              progress: data.step,
            },
          ])
        })
        console.log("Response: ", response.data.note);
        console.log("Data : ", kanbanListSet);
      })
    }
    catch (e) {
      console.error(e);
    }}
    })();
  },[])

  const clearData = (arr) => {
    return [...arr.slice(0,0)]
  }

  const progressName = [
    {id: 1, progress: 'TODO'},
    {id: 2, progress: 'PROGRESS'},
    {id: 3, progress: 'VERIFY'},
    {id: 4, progress: 'DONE'},
  ];

  const projectId = Number(window.localStorage.getItem("selectedProjectId"))
  console.log("ProjectId : ", projectId);
  
  const dataHandler = (progress) => {
    return kanbanList
    .filter((data) => data.progress === progress)
    .map((item) => <EditList key={item.id} item={item}/>);
  }

  return (
    <>
      <section className="kanbanListContainer">
        <DndProvider className="Kanban" backend={HTML5Backend}>
          {progressName.map((data) => (
            <KanbanList key={data.id} title={`${data.progress}`}>
              {dataHandler(data.progress)}
            </KanbanList>
          ))}
        </DndProvider>
      </section>
    </>
  )
}

export default Kanban;