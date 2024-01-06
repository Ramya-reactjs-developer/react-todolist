import React, { useState, useEffect } from "react";
import { LiaEdit } from "react-icons/lia";
import { MdOutlineDelete } from "react-icons/md";
import { MdAddCircle } from "react-icons/md";
import { RiCheckboxBlankCircleLine } from "react-icons/ri";
import { RiCheckboxCircleFill } from "react-icons/ri"
import { AiOutlineCalendar } from 'react-icons/ai'
import { IoIosArrowBack } from 'react-icons/io'
import { BsClock, BsDisplay } from 'react-icons/bs'

import moment from "moment";
import Modal from "./Modal";

export default function ModelContent({ HeadingText, pendingTasks, completedTasks }) {
  const [userdata, setuserdata] = useState({ task: "" });
  const [tasklist, setTaskList] = useState([]);
  const [edit, setedit] = useState(false);
  const [isDelete, setisDelete] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [deletedItems, setDeletedItems] = useState([]);
  const [inputFocus, setInputFocus] = useState(false);
  const [confromIndex, setConformIndex] = useState();
  const [editIndex, seteditIndex] = useState();
  const [id, setId] = useState();
  const [taskTitlename, setTasktitlename] = useState("");


  //for avoid duplicate
  // const list = [...new Set(list1)];

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem(pendingTasks));
    if (storedTasks) {
      setTaskList(storedTasks);
    }
    const storedDeletedItems = JSON.parse(localStorage.getItem(completedTasks));
    if (storedDeletedItems) {
      setDeletedItems(storedDeletedItems);
    }

  }, []);

  useEffect(() => {
    localStorage.setItem(pendingTasks, JSON.stringify(tasklist));
  }, [tasklist]);

  useEffect(() => {
    // alert(taskTitlename);
  }, [taskTitlename]);



  const onChangeHandle = (e) => {
   
    const { name, value } = e.target;
    setuserdata({ ...userdata, [name]: value });
  };

  const createdDay = moment().format('dddd');
  const createdDate = moment().format('DD/MM/YYYY h:mm');
  const createdTime = moment().format('h:mm:ss');
  console.log(createdDay, "createdDay")



  const handleClick = () => {



    //const taskExists = tasklist.some((item) => item.task === userdata.task);

    const taskExistsInPending = tasklist.some((item) => item.task === userdata.task);
    const taskExistsInDesign = JSON.parse(localStorage.getItem("designPendingtasks") || "[]").some((item) => item.task === userdata.task);
    const taskExistsInSchool = JSON.parse(localStorage.getItem("schoolPendingtasks") || "[]").some((item) => item.task === userdata.task);
    const taskExistsInPersonal = JSON.parse(localStorage.getItem("personalPendingtasks") || "[]").some((item) => item.task === userdata.task);



    if (userdata?.task && !edit && !taskExistsInPending && !taskExistsInDesign && !taskExistsInSchool && !taskExistsInPersonal) {
      setTaskList([...tasklist, { task: userdata.task, createdDay, createdTime, createdDate }]);
      setuserdata({ task: "" });
    } else if (edit) {
      const upD = [...tasklist];

      upD[editIndex] = {
        task: userdata.task,
        createdDay: upD[editIndex].createdDay,
        createdTime: upD[editIndex].createdTime,
        createdDate: upD[editIndex].createdDate,
        editedDate: createdDate,
        editedDay: createdDay,
        editedTime: createdTime
      };
      setTaskList(upD);
      setuserdata({ task: "" });
      setedit(false);
    } else if (taskExistsInPending || taskExistsInDesign || taskExistsInSchool || taskExistsInPersonal) {
      alert("Task already exists!");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleClick();
    }
  };

  const onDel = (index, taskName) => {
    setId(index);
    setTasktitlename(taskName);
    setisDelete(true);

  };


  const ModalDel = () => {

    const deL = [...tasklist];
    deL.splice(id, 1);
    setTaskList(deL);
    setisDelete(false);

  }

  const onEdit = (index) => {

    setedit(true);
    seteditIndex(index)
    setuserdata([...tasklist][index]);


  };

  const checkboxItems = (index, taskName) => {
    setConformIndex(index);
    setTasktitlename(taskName);
    setConfirm(true);

  };

  const onClickconfrom = () => {
    const itemToDelete = tasklist[confromIndex];
    const deL = [...tasklist];
    deL.splice(confromIndex, 1);
    setTaskList(deL);
    setDeletedItems([...deletedItems, itemToDelete]);
    setConfirm(false)

  }

  const onClose = () => {
    setuserdata({ task: "" });
    setedit(false)
  }

  useEffect(() => {
    localStorage.setItem(completedTasks, JSON.stringify(deletedItems));
  }, [deletedItems]);

  const sumarraylength = tasklist.length + deletedItems.length;


  const tasklistreverse = [...tasklist].reverse();
  console.log(tasklistreverse, "tasklistreverse")

  return (
    <>
      <div className="MainContent" style={{}}>
        <div className="InputBox">
          <div className="headingText" >
            <h2 className="arrowIcon">  <IoIosArrowBack /></h2>

            <h2>{HeadingText}</h2>
          </div>

          <div className="mainPosition">
            <div style={{ position: "relative" }} >
              <span className="AddTaskIcon"><MdAddCircle /></span>

              <input

                type="text"
                name="task"
                onChange={onChangeHandle}
                onKeyPress={handleKeyPress}
                value={userdata.task}
                className={inputFocus ? 'input-focus' : 'AddTaskInput'}
                onFocus={() => setInputFocus(true)}
                onBlur={() => setInputFocus(false)}
                placeholder="Add Tasks"
                autoFocus
                autoComplete="off"
              />
            </div>

          </div>
        </div>



        <div className="addTask">

          <h3>Tasks-{sumarraylength}</h3>
          {tasklistreverse?.length > 0 &&
            tasklistreverse !== null ?
            (
              <>
                {tasklistreverse?.map((item, index) => {
                  const reversedIndex = tasklistreverse.length - 1 - index;

                  return (
                    <>

                      <div className="ListedTasks">

                        <div className=" ListingText" key={index}>

                         <RiCheckboxBlankCircleLine className="roundoutline" onClick={() => checkboxItems(reversedIndex, item.task)} /> 

                          <div className="text">
                            <p className="line_count">{item?.task}</p>

                          <div style={{display:"flex"}} >
                            <p> <span className="listlength">{deletedItems?.length}/{sumarraylength}</span>
                             
                              <span className="listdateIcon">  <AiOutlineCalendar className="listdateIcon" />{item.createdDay} </span>
                           
                            </p>  
                              {item.editedTime ? (
                               <p>
                                <span className="strikethrough listdateIconClock">  <BsClock className="listdateIconClock" />{item.createdTime}</span>
                              
                               <span className="listdateIconClock">  <BsClock className="listdateIconClock" />{item.editedTime}</span>
                               </p>
                              
                                ) : (<p>
                               
                                <span className="listdateIconClock">  <BsClock className="listdateIconClock" />{item.createdTime}</span>
                              </p>
                              )}
                           </div>
                          </div>
                        </div>

                        <div className="ListingIcons">
                          <button className="edit-btn" onClick={() => onEdit(reversedIndex)}>
                            {""}
                            <LiaEdit />{""}
                          </button>
                          <button className="delete-btn" onClick={() => { onDel(reversedIndex, item.task) }}>
                            <MdOutlineDelete  />
                          </button>
                        </div>


                      </div>
                    </>
                  );
                })}
              </>) : (
              <div className="noTask">
                <h3>No Tasks Pending</h3>
              </div>
            )}
        </div>




        <div>
          <div className="addTask">
            <h3>Completed Taks - {deletedItems.length}</h3>
            {deletedItems?.length > 0 &&
              deletedItems !== null ?
              (
                <>
                  {deletedItems?.map((item, index) => {

                    return (
                      <>


                        <div className="ListedTasks">
                          <div className=" ListingText" key={index}>

                            <div><RiCheckboxCircleFill className="roundoutline" /> </div>

                            <div className="text">
                              <del className="listPara" >{item?.task}</del>
                              <p><AiOutlineCalendar className="listdateIcon" />< span className="listdateIcon"> {item.createdDay} </span></p>
                            </div>
                          </div>




                        </div>
                      </>
                    );
                  })}
                </>) : (
                <div className="noTask">
                  <h3>No Tasks Completd </h3>
                </div>)}
          </div>
        </div>


        {edit ? (

          <Modal
            show={edit}
            onClose={onClose}
            onChangeHandle={onChangeHandle}
            task={userdata.task}
            handleClick={handleClick}
            onKeyPress={handleKeyPress}
            edit={edit}
            label={"Update"}
            text={"Are You Edit  This Task?"}
          />

        ) : null}

        {isDelete ? (

          <Modal
            show={isDelete}
            onClose={() => setisDelete(false)}
            handleClick={ModalDel}
            label={"Delete"}
            isDelete={isDelete}
            text={"Are You Comform to Delete ?"}
            taskTitlename={taskTitlename}
          />

        ) : null}

        {confirm ? (

          <Modal
            show={confirm}
            onClose={() => setConfirm(false)}
            handleClick={onClickconfrom}
            confirm={confirm}
            label={"Complete"}
            text={"Are You Comform to Complete?"}
            taskTitlename={taskTitlename}
          />

        ) : null}


      </div>



    </>
  );
}









