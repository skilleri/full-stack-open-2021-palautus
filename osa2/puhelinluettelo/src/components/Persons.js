import React from 'react'

const Persons = ({persons, handleRemoveClick}) => {
	return (
		<div>
			{persons.map(person =>
        <div key={person.id}>{person.name} {person.number}
				<button onClick={() => {
					if (window.confirm("Delete " + person.name + " ?")) {
						handleRemoveClick(person.id)
					}}}>delete</button>
				</div>
      )}
		</div>
	)
}

export default Persons