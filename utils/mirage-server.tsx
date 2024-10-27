import { createServer, Factory, Model } from "miragejs";
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

			this.get("/users/:id", (schema, request) => {
				const id = request.params.id;
				return schema.find("user", id);
			});

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			this.put("/users/:id", (schema: any, request: any) => {
				const id = request.params.id;
				const attrs = JSON.parse(request.requestBody);
				const user = schema.users.find(id);
				return user?.update(attrs);
			});

			this.post("/users", (schema, request) => {
				const attrs = JSON.parse(request.requestBody);
				const user = schema.create("user", attrs);
				return user.attrs;
			});
		},
	});
}
