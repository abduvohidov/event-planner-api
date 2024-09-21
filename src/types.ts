export const TYPES = {
	Application: Symbol.for('Application'),
	ILogger: Symbol.for('ILogger'),
	ExeptionFilter: Symbol.for('ExeptionFilter'),
	ConfigService: Symbol.for('ConfigService'),
	PrismaClient: Symbol.for('PrismaClient'),
	PrismaService: Symbol.for('PrismaService'),

	UserController: Symbol.for('UserController'),
	UserService: Symbol.for('UserService'),
	UserModel: Symbol.for('UserModel'),
	UserRepository: Symbol.for('UserRepository'),

	EventController: Symbol.for('EventController'),
	EventService: Symbol.for('EventService'),
	EventModel: Symbol.for('EventModel'),
	EventRepository: Symbol.for('EventRepository'),

	AttandeeController: Symbol.for('AttandeeController'),
	AttandeeService: Symbol.for('AttandeeService'),
	AttandeeModel: Symbol.for('AttandeeModel'),
	AttandeeRepository: Symbol.for('AttandeeRepository'),
};
