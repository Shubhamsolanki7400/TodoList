import React, { useState, useEffect } from 'react'
import '../component/Todo.css'
function RealTodo() {
    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem('todos'));
        if (storedTodos) {
            setTodos(storedTodos);
        }
    }, []);



    const handleAddTodo = () => {
        if (inputValue.trim() === '') return;

        const newTodo = {
            id: Date.now(),
            title: inputValue,
            completed: false,
        };

        setTodos([...todos, newTodo]);
        localStorage.setItem('todos', JSON.stringify([...todos, newTodo]));
        setInputValue('');
    };

    const handleDeleteTodo = (id) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    const handleToggleCompleted = (id) => {
        setTodos(
            todos.map((todo) => {
                if (todo.id === id) {
                    return { ...todo, completed: !todo.completed };
                } else {
                    return todo;
                }
            })
        );
    };

    const handleEditTodo = (id, newTitle) => {
        setTodos(
            todos.map((todo) => {
                if (todo.id === id) {
                    return { ...todo, title: newTitle };
                } else {
                    return todo;
                }
            })
        );
    };

    const handleClearCompleted = () => {
        setTodos(todos.filter((todo) => !todo.completed));
    };
    console.log(todos)
    return (
        <>
            <div class="topnav">
                <a class="active" href="#home">Home</a>
                <a href="#news">News</a>
                <a href="#contact">Contact</a>
                <a href="#about">About</a>
            </div>
            <div className='container-fluid col-sm-4 main-container'>
                <h1 className='head'>Todo List</h1>
                <div>
                    <input className='main-inputbox' type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
                    <button className='btn-edit' onClick={handleAddTodo}>Add</button>
                </div>
                <ul className='list'>
                    {todos.map((todo) => (
                        <li className='listtag' key={todo.id}>
                            <input className='input-box' type="checkbox" checked={todo.completed} onChange={() => handleToggleCompleted(todo.id)} />
                            <span
                                className='spantag'
                                style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
                                onDoubleClick={() => {
                                    const newTitle = prompt('Enter new title:', todo.title);
                                    if (newTitle) {
                                        handleEditTodo(todo.id, newTitle);
                                    }
                                }}
                            >
                                {todo.title}
                            </span>
                            <button className='btn-edit' onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
                <button className='btn-edit' onClick={handleClearCompleted}>Clear Completed</button>
            </div>
        </>
    );
}



export default RealTodo