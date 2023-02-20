const connection = require('./connection');

class DB {
	constructor(connection) {
		this.connection = connection;
	}

	findAllDepartments() {
		return this.connection.promise().query('SELECT department.id, department.name FROM department');
	}

	findAllRoles() {}

	findAllEmployees() {}

	createDepartment() {}

	createRole() {}

	createEmployee() {}

	modifyRole() {}
}

module.exports = new DB(connection);
