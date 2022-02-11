import React, { useState, useEffect } from "react";

export const TodoList = () => {
	const [inputTask, setInputTask] = useState("");
	const [taskList, setTaskList] = useState([]); // SetTaskList changes value of tasklist

	const uri = "https://assets.breatheco.de/apis/fake/todos/user/cnvorous";

	// (put the function in the code)
	// function onChange(e) {
	// 	const newValue = e.target.value;
	// 	setInputValue(newValue);
	// }

	// TRIGGER 1ST GET API request use useEffect (should always be 1st & GET for webpages to get info from back)
	useEffect(() => {
		fetch(uri, {
			method: "GET",
		})
			.then((response) => {
				// the info we are getting from GET is the response(its in form of json)
				return response.json(); // we use .json to return info into normal object
			})
			.then((data) => {
				setTaskList(data);
				console.log("data from backend", data);
			});
	}, []);

	const updatePut = (updatedTodos) => {
		//updatedTodos is just a placeholder for the info we get from newToDos becuase newToDO only exist in saveTask function
		//put  FETCH API command
		fetch(uri, {
			method: "PUT",
			body: JSON.stringify(updatedTodos), // data can be `string` or {object}!
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((resp) => {
				console.log(resp.ok); // will be true if the response is successfull
				console.log(resp.status); // the status code = 200 or code = 400 etc.
				console.log(resp.text()); // will try return the exact result as string
				return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
			})
			.then((data) => {
				//here is were your code should start after the fetch finishes
				console.log(data); //this will print on the console the exact object received from the server
			})
			.catch((error) => {
				//error handling
				console.log(error);
			});
	};

	const saveTask = (e) => {
		//[GET] API command list of TODOS
		if (e.keyCode == 13) {
			let todos = [...taskList];
			let newTodos = todos.concat({
				// takes previous list and new item to make current list
				label: inputTask,
				done: false,
			});
			setTaskList(newTodos); //** deleted info and replaced it with newTODOS***// this is updating value of tasklist //inputTask is passing value to tasklist = we changed inputtask to newTASK to make object (before it was a string and doesnt work with API)
			updatePut(newTodos); //scope of NewTodos is only in this save in this function
			setInputTask(""); // this is clearing out the input text field after enter
		}
	};

	//	API  REQUEST
	// Need to use useEffect
	// useEffect(()=>{
	// get TODO function passes the new list
	//}, [taskList]);

	const removeTask = (index) => {
		const removeTaskArr = taskList.filter((tasktToRemove, i) => i != index);
		setTaskList(removeTaskArr); // changes the front end
		updatePut(removeTaskArr); // changes the back end
		//**deleted big chunk code */ //filter is higher order function. makes new array w/out that one index
	};

	const markDone = (index) => {
		const possibleDoneArray = taskList.map((task, i) => {
			if (i == index) {
				task.done = !task.done;
				return task;
			} else {
				return task;
			}
		});
		setTaskList(possibleDoneArray);
		updatePut(possibleDoneArray);
	};
	//**deleted big chunk code */ //filter is higher order function. makes new array w/out that one index

	return (
		<div className="todo-box">
			<h1>todos</h1>
			<input
				className="center-block"
				type="text"
				onChange={(e) => setInputTask(e.target.value)} // this saves the info user input
				value={inputTask} ////////////////////////////// this displays/onlys shows whats typed in input (currently) from the user in variable
				onKeyUp={(e) => saveTask(e)} // passing e(onkeyupevent) to the function saveTask
				//onChange={onChange} if used function above to call
			/>
			<ul>
				{taskList.map((task, index) => {
					// map function passes a function inisde of it (always pass item 1st then index)
					return (
						<li className="list" key={index}>
							{" "}
							{/*must have key when using map function*/}
							<span className={task.done ? "strike" : ""}>
								{task.label}
							</span>
							<span
								className="delete-icon"
								onClick={() => removeTask(index)}>
								{" "}
								{/*all we care about is the index to remove task not the event itself. we are not trying to save any value by the onclick*/}
								<i className="fas fa-trash"></i>
							</span>
							<span
								onClick={() => markDone(index)}
								className={task.done ? "green" : ""}>
								{" "}
								{/*all we care about is the index to remove task not the event itself. we are not trying to save any value by the onclick*/}
								<i className="fas fa-check-square"></i>
							</span>
						</li>
					);
				})}
			</ul>
			<div className="task-counter">
				<em>
					{taskList.length == 0
						? "no tasks"
						: `${taskList.length} tasks `}
				</em>
			</div>
		</div>
	);
};
