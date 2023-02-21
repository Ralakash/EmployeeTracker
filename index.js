const { prompt } = require('inquirer');
const db = require('./db');

const mainMenu = async () => {
	prompt([
		{
			type: 'list',
			name: 'choice',
			message: 'Please select from the following options',
			choices: [
				{
					name: 'View all departments',
					value: 'VIEW_DEPARTMENTS',
				},
				{
					name: 'View all roles',
					value: 'VIEW_ROLES',
				},
				{
					name: 'View all employees',
					value: 'VIEW_EMPLOYEES',
				},
				{
					name: 'Add a department',
					value: 'ADD_DEPARTMENT',
				},
				{
					name: 'Add a role',
					value: 'ADD_ROLE',
				},
				{
					name: 'Add an employee',
					value: 'ADD_EMPLOYEE',
				},
				{
					name: 'Update an employee role',
					value: 'UPDATE_ROLE',
				},
				{
					name: 'Quit',
					value: 'QUIT',
				},
			],
		},
	]).then((res) => {
		let choice = res.choice;
		switch (choice) {
			case 'VIEW_DEPARTMENTS':
				viewAllDepartments();
				break;
			case 'VIEW_ROLES':
				viewAllRoles();
				break;
			case 'VIEW_EMPLOYEES':
				viewAllEmployees();
				break;
			case 'ADD_DEPARTMENT':
				addDepartment();
				break;
			case 'ADD_ROLE':
				addRole();
				break;
			case 'ADD_EMPLOYEE':
				addEmployee();
				break;
			case 'UPDATE_ROLE':
				updateRole();
				break;
			default:
				quit();
		}
	});
};

const viewAllDepartments = () => {
	db.findAllDepartments()
		.then(([rows]) => {
			let departments = rows;
			console.log('\n');
			console.table(departments);
		})
		.then(() => mainMenu());
};

const viewAllRoles = () => {
	db.findAllRoles()
		.then(([rows]) => {
			let roles = rows;
			console.log('\n');
			console.table(roles);
		})
		.then(() => mainMenu());
};

const viewAllEmployees = () => {
	db.findAllEmployees()
		.then(([rows]) => {
			let employees = rows;
			console.log('\n');
			console.table(employees);
		})
		.then(() => mainMenu());
};

const addDepartment = () => {
	prompt([
		{
			name: 'name',
			message: 'what is the name of the department',
		},
	]).then((res) => {
		let name = res;
		db.createDepartment(name)
			.then(() => console.log(`Added ${name.name}`))
			.then(() => mainMenu());
	});
};

const addRole = () => {
	prompt([
		{
			name: 'name',
			message: 'what is the name of the role',
		},
	]).then((res) => {
		let name = res;
		db.createRole(name)
			.then(() => console.log(`Added ${name.name}`))
			.then(() => mainMenu());
	});
};

const addEmployee = () => {
	prompt([
		{
			name: ' first_name',
			message: 'what is the first name of the Employee',
		},
		{
			name: ' last_name',
			message: 'what is the last name of the Employee',
		},
	]).then((res) => {
		let firstName = res.first_name;
		let lastName = res.last_name;
		db.findAllRoles().then(([rows]) => {
			let roles = rows;
			const roleChoices = roles.map(({ id, title }) => ({
				name: title,
				value: id,
			}));
			prompt({
				type: 'list',
				name: 'roleId',
				message: "Please select employee's role",
				choices: roleChoices,
			}).then((res) => {
				let roleID = res.roleID;
				db.findAllEmployees().then(([rows]) => {
					let manager = rows;
					const managerChoices = manager.map(({ id, first_name, last_name }) => ({
						name: `${first_name} ${last_name}`,
						value: id,
					}));
					prompt({
						type: 'list',
						name: 'managerId',
						message: "Please select employee's Manager",
						choices: managerChoices,
					}).then((res) => {
						let employee = {
							manager_id: res.managerId,
							role_id: roleID,
							first_name: firstName,
							last_name: lastName,
						};

						db.createemployee(employee)
							.then(() => console.log(`Added ${firstName} ${lastName} as an employee`))
							.then(() => mainMenu());
					});
				});
			});
		});
	});
};

const updateRole = () => {
	db.findAllEmployees().then(([rows]) => {
		let employee = rows;
		const employeeChoices = employee.map(({ id, first_name, last_name }) => ({
			name: `${first_name} ${last_name}`,
			value: id,
		}));
		prompt({
			type: 'list',
			name: 'employeeId',
			message: "Please select which employee's role you would like to update.",
			choices: employeeChoices,
		}).then((res) => {
			let employeeId = res.employeeId;
			db.findAllRoles().then(([rows]) => {
				let roles = rows;
				const roleChoices = roles.map(({ id, title }) => ({
					name: title,
					value: id,
				}));
				prompt({
					type: 'list',
					name: 'roleId',
					message: "Please select the employee's new role",
					choices: roleChoices,
				}).then(res => db.updateRole(employeeId, res.roleID))
				.then(() => {console.log("Updated employee's role")})
				.then(() => mainMenu());

		});
	})
};

const quit = () => {
	console.log('Goodbye!');
	process.exit();
};

const init = () => {
	mainMenu();
};
