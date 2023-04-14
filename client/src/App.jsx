import { useState } from "react";
import axios from "axios";

function App() {
	const [name, setName] = useState("");
	const [age, setAge] = useState(0);
	const [country, setCountry] = useState("");
	const [position, setPosition] = useState("");
	const [wage, setWage] = useState(0);
	const [employeesList, setEmployeesList] = useState([]);

	const addEmployee = async () => {
		const response = await axios.post("http://localhost:3000/create", {
			name,
			age,
			country,
			position,
			wage,
		});
		setEmployeesList([...employeesList, JSON.parse(response.config.data)]);
	};

	const getEmployees = async () => {
		const response = await axios.get("http://localhost:3000/employees");
		setEmployeesList(response.data);
		// console.log(employeesList);
	};

	return (
		<>
			<div className="flex flex-col items-start mx-auto gap-2 h-screen max-w-2xl mt-10 px-10">
				<div className="flex justify-between w-full">
					<label htmlFor="name">Name: </label>
					<input
						type="text"
						id="name"
						name="name"
						className="border rounded-sm"
						onChange={(e) => setName(e.target.value)}
					/>
				</div>

				<div className="flex justify-between w-full">
					<label htmlFor="age">Age: </label>
					<input
						type="number"
						id="age"
						name="age"
						className="border rounded-sm"
						onChange={(e) => setAge(e.target.value)}
					/>
				</div>

				<div className="flex justify-between w-full">
					<label htmlFor="country">Country: </label>
					<input
						type="text"
						id="country"
						name="country"
						className="border rounded-sm"
						onChange={(e) => setCountry(e.target.value)}
					/>
				</div>

				<div className="flex justify-between w-full">
					<label htmlFor="position">Position: </label>
					<input
						type="text"
						id="position"
						name="position"
						className="border rounded-sm"
						onChange={(e) => setPosition(e.target.value)}
					/>
				</div>

				<div className="flex justify-between w-full">
					<label htmlFor="wage">Wage(yearly): </label>
					<input
						type="number"
						id="wage"
						name="wage"
						className="border rounded-sm"
						onChange={(e) => setWage(e.target.value)}
					/>
				</div>

				<div className="flex justify-between w-full my-4">
					<button
						className="bg-green-700 px-2 py-1 rounded-sm text-white"
						onClick={addEmployee}
					>
						Add Employee
					</button>
					<button
						className="bg-blue-500 px-2 py-1 rounded-sm text-white"
						onClick={getEmployees}
					>
						Show Employees
					</button>
				</div>

				{employeesList.length > 0 && (
					<table className="table-auto border-collapse border border-slate-500 w-full text-center">
						<thead>
							<tr>
								<th className="border border-slate-300 p-1">#</th>
								<th className="border border-slate-300 p-1">Name</th>
								<th className="border border-slate-300 p-1">Age</th>
								<th className="border border-slate-300 p-1">Position</th>
								<th className="border border-slate-300 p-1">Country</th>
								<th className="border border-slate-300 p-1">Wage</th>
							</tr>
						</thead>
						<tbody>
							{employeesList.map((employee, index) => (
								<tr key={employee.id}>
									<td className="border border-slate-300 p-1">{index + 1}</td>
									<td className="border border-slate-300 p-1">
										{employee.name}
									</td>
									<td className="border border-slate-300 p-1">
										{employee.age}
									</td>
									<td className="border border-slate-300 p-1">
										{employee.position}
									</td>
									<td className="border border-slate-300 p-1">
										{employee.country}
									</td>
									<td className="border border-slate-300 p-1">
										{employee.wage}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				)}
			</div>
		</>
	);
}

export default App;
