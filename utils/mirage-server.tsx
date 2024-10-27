import { createServer, Factory, Model, Server } from "miragejs";
import { faker } from "@faker-js/faker";
import Schema from "miragejs/orm/schema";
import type { Registry } from "miragejs";
import { User } from "@/types/user";

const UserModel = Model.extend<Partial<User>>({});

const UserFactory = Factory.extend({
	id(i: number) {
		return String(i + 1);
	},
	name() {
		return faker.person.fullName();
	},
	email(this: { name: string }) {
		return this.name.toLowerCase().replace(/\s/g, ".") + "@example.com";
	},
});

type AppRegistry = Registry<
	{ user: typeof UserModel },
	{ user: typeof UserFactory }
>;
type AppSchema = Schema<AppRegistry>;

export function makeServer() {
	return createServer({
		models: {
			user: UserModel,
		},
		factories: {
			user: UserFactory,
		},
		seeds(server) {
			server.createList("user", 100);
		},
		routes() {
			this.namespace = "api";

			this.get("/users", (schema: AppSchema) => {
				return schema.all("user");
			});
		},
	});
}
