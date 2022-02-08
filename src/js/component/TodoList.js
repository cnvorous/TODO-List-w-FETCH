import React, { useState } from "react";

export const TodoList = () => {
	const [inputTask, setInputTask] = useState("");
	const [taskList, setTaskList] = useState([]);

	// (put the function in the code)
	// function onChange(e) {
	// 	const newValue = e.target.value;
	// 	setInputValue(newValue);
	// }

	const saveTask = (e) => {
		if (e.keyCode == 13) {
			setTaskList([...taskList, inputTask]);
			setInputTask("");
		}
	};

	const removeTask = (index) => {
		setTaskList(taskList.filter((tasktToRemove, i) => i != index));
	};
	return (
		<div className="todo-box">
			<h1>todos</h1>
			<input
				className="center-block"
				type="text"
				onChange={(e) => setInputTask(e.target.value)}
				value={inputTask}
				onKeyUp={(e) => saveTask(e)}
				//onChange={onChange} if used function above to call
			/>
			<ul>
				{taskList.map((task, index) => {
					return (
						<li className="list" key={index}>
							{task}
							<span
								className="delete-icon"
								onClick={() => removeTask(index)}>
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
