import React from "react";
import logo from "./logo.svg";
import useContentful from "./hooks/use-contentful.js";
import "./App.css";

const query = `
  query {
    person(id: "7wpWeHFj7WaAncNhWUTg0K") {
      name
    }
  }
`;

function App() {
	let {data, errors} = useContentful(query);

	if (errors)
		return (
			<span style={{color: "red"}}>
				{errors.map(error => error.message).join(",")}
			</span>
		);
	if (!data) return <span>Loading...</span>;

	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				{data.person.name}
			</header>
		</div>
	);
}

export default App;
