import React, { useState } from "react";

export const TodoList = () => {
	const [inputTask, setInputTask] = useState("");
	const [taskList, setTaskList] = useState([]); // SetTaskList changes value of tasklist

	// (put the function in the code)
	// function onChange(e) {
	// 	const newValue = e.target.value;
	// 	setInputValue(newValue);
	// }

	const saveTask = (e) => {
		if (e.keyCode == 13) {
			setTaskList([...taskList, inputTask]); // this is updating value of tasklist
			setInputTask(""); // this is clearing out the input text field after enter
		}
	};

	const removeTask = (index) => {
		setTaskList(taskList.filter((tasktToRemove, i) => i != index)); //filter is higher order function. makes new array w/out that one index
	};
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
							{task}
							<span
								className="delete-icon"
								onClick={() => removeTask(index)}>
								{" "}
								{/*all we care about is the index to remove task not the event itself. we are not trying to save any value by the onclick*/}
								<i className="fas fa-trash"></i>
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
