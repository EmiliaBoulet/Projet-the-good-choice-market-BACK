import {faker} from "@faker-js/faker";
// faker.locale = "fr";

for (let i = 0; i < 100; i++) {
    console.log(faker.name.firstName());
}
