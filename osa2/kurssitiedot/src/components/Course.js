import React from 'react';

const Header = ({course}) => {
	return (
		<h2>{course.name}</h2>
	)
}
  
const Total = ({course}) => {
	const sum = course.parts.reduce((total, part) =>
			total + part.exercises, 0
	)
	return (
		<b>total of {sum} exercises</b>
	) 
}
  
const Part = ({part}) => {
	return (
		<p>
			{part.name} {part.exercises}
		</p>    
	)
}
  
const Content = ({course}) => {
	return (
		<div>
			{course.parts.map(part =>
				<Part key={part.id} part={part} />
			)}
		</div>
	)
}

const Course = ({course}) => {
	return (
		<div>
			<Header course={course} />
			<Content course={course} />
			<Total course={course} />
		</div>
	)
}

export default Course