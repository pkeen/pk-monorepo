import type { db } from "@/db";
import { schema } from "@/courses";
import { faker } from "@faker-js/faker";

const seed = async (db: db) => {
	const spoofArray = [];

	for (let i = 0; i < 30; i++) {
		const spoofData = {
			name: faker.company.buzzPhrase(),
			description: faker.lorem.sentences(),
			isPublished: faker.datatype.boolean(0.75),
		};
		spoofArray.push(spoofData);
	}

	try {
		await db.insert(schema.module).values(spoofArray);
		console.log("modules succesfully seeded...");
	} catch (error) {
		console.error("Error inserting modules:", error);
	}
};

export default seed;
