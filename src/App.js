import React from "react";
import Person from "./components/person";
import Bookmarks from "./components/bookmarks";
import useContentful from "./hooks/use-contentful.js";
import "./App.css";

const query = `
query($isPreview: Boolean=false){
  person(id: "7wpWeHFj7WaAncNhWUTg0K", preview: $isPreview) {
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

  allBookmarks: bookmarkCollection {
    items {
      ...bookmarkFields
    }
  }

  favoriteTagCollection: tagCollection(where: {
    title_contains: "Favorite"
  }, limit: 1) {
    items {
      title
      linkedFrom {
        bookmarkCollection {
          items {
            ...bookmarkFields
          }
        }
      }
    }
  }
}

fragment bookmarkFields on Bookmark {
  sys {
    id
  }
  title
  url
  comment
  tagsCollection(limit: 10) {
    items {
      title
    }
  }
}
`;

const IS_PREVIEW = false; // Change to see unpublished changes in UI

function App() {
	let {data, errors} = useContentful(query, IS_PREVIEW);

	if (errors)
		return (
			<span style={{color: "red"}}>
				{errors.map(error => error.message).join(",")}
			</span>
		);
	if (!data) return <span>Loading...</span>;

	const {allBookmarks, favoriteTagCollection, person} = data;
	const favoriteTag = favoriteTagCollection.items[0];

	return (
		<div className="App">
			<Person person={person} />
			<Bookmarks
				bookmarks={favoriteTag.linkedFrom.bookmarkCollection.items}
				headline="My bookmarks"
			/>
			<Bookmarks bookmarks={allBookmarks.items} headline="My bookmarks" />
		</div>
	);
}

export default App;
