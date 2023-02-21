const connection = require('./connection');

class DB {
	constructor(connection) {
		this.connection = connection;
	}

	findAllDepartments() {
		return this.connection.promise().query('SELECT department.id, department.name FROM department');
	}

	findAllRoles() {
		return this.connection
			.promis()
			.query(
				'SELECT role.id, role.title, department.name AS department, role.department_id, role.salary'
			);
	}

	findAllEmployees() {
		return this.connection
			.promise()
			.query(
				"SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager"
			);
	}

	createDepartment(department) {
		return this.connection.promise().query('INSERT INTO department SET ?', department);
	}

	createRole(role) {
		return this.connection.promise().query('INSERT INTO role SET ?', role);
	}

	createEmployee(employee) {
		return this.connection.promise().query('INSERT INTO employee SET ?', employee);
	}

	modifyRole(employeeId, roleId) {
		return this.connection
			.promise()
			.query('UPDATE employee SET role_id = ? WHERE id = ?', [roleId, employeeId]);
	}
}

module.exports = new DB(connection);
