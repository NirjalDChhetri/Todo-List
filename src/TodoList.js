import React, { useState } from 'react'
import { Container, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.css"
import {FaPlus, FaTrash} from "react-icons/fa"

const TodoList = () => {
    const initiaData= JSON.parse (localStorage.getItem("todos"))
    const[todoList, setTodoList] = useState([...initiaData]);
    const [text, setText] = useState("");

    const addTodo = ()=>{
        const newTodo = ([
            ...todoList,
            {
                data:text, 
                date:new Date().toLocaleString().split(",")[0], 
                isCompleted: false},
            ]);
            setText("");
            setTodoList(newTodo);
            localStorage.setItem("todos", JSON.stringify(newTodo));
    };
    const toggleTodoCompletion = (idx)=>{

        const newTodo = todoList.map((todo, index)=>{
            if (index===idx) return {...todo, isCompleted : !todo.isCompleted};
            else return todo
        });
        setTodoList(newTodo);
        localStorage.setItem("todos", JSON.stringify(newTodo));

    };
    const deleteTodo = (idx)=>{
        const response = window.confirm("Do you want to delete ?");
        if (response){
        const newTodo = todoList.filter((todo, index)=>{
            if (index===idx) return false;
            else return true;

        });
        setTodoList(newTodo);
        localStorage.setItem("todos", JSON.stringify(newTodo))
    };
    };


  return (
    <div>
        <Container className="mt-5 text-center" >
            <h2>TodoList App</h2>
        <Form.Control
         type="text"
        value={text}
         onChange={(e)=>setText(e.target.value)}
         onKeyPress={(e) => (e.key==="Enter" && addTodo() )}
         />
        <br/>
        <Button onClick={addTodo}>
        <FaPlus/>
        <label className="ms-2">Add</label>
        </Button>
        {todoList.length > 0 ?
        todoList.map((todo, index)=>{
            return (
                <Row>
                    <Col xs={10}>
            <Alert className="text-start"
            style={{
            cursor:"Pointer",
             textDecoration: todo.isCompleted ? "line-through" : "none"}}
             onClick={()=>toggleTodoCompletion(index)}>
                <h3>{todo.data}</h3>
                <small>{todo.date}</small>
                </Alert>
                </Col>
                <Col className="mt-4">
                <FaTrash
                 fontSize={40} color="red" onClick={()=>deleteTodo(index)}/>
                </Col>
                </Row>
                
                )
        }): "No Todo-list"
        }
        </Container>
    </div>
  )
}

export default TodoList