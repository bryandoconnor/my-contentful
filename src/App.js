import React from "react";
import Person from "./components/person";
import Bookmarks from "./components/bookmarks";
import useContentful from "./hooks/use-contentful.js";
import "./App.css";

const query = `
query {
  person(id: "7wpWeHFj7WaAncNhWUTg0K") {
    name
    title
    bio {
      json
    }
    socialTwitter
    socialGithub
    socialLinkedin
    image {
      title
      url
    }
  }

  bookmarkCollection {
    items {
      sys {
        id
      }
      title
      url
      comment
      tagsCollection {
        items {
          title
        }
      }
    }
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

	const {bookmarkCollection, person} = data;

	return (
		<div className="App">
			<Person person={person} />
			<Bookmarks bookmarks={bookmarkCollection.items} headline="My bookmarks" />
		</div>
	);
}

export default App;
