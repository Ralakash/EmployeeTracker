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

const viewAllRoles = () => {};

const viewAllEmployees = () => {};

const addDepartment = () => {};

const addRole = () => {};

const addEmployee = () => {};

const updateRole = () => {};

const quit = () => {
	console.log('Goodbye!');
	process.exit();
};

const init = () => {
	mainMenu();
};
