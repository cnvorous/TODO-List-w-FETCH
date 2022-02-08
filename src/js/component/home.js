import React from "react";

import { TodoList } from "./TodoList.js";

//create your first component
export const Home = () => {
	return (
		<div className="page">
			<div className="bg-white text-warning">
				<TodoList />
			</div>
		</div>
	);
};
