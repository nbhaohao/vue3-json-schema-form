export default {
  name: "Simple",
  schema: {
    description: "A simple form example.",
    type: "object",
    properties: {
      firstName: {
        title: "firstName",
        type: "string",
        default: "Chuck",
        minLength: 6,
      },
      lastName: {
        title: "lastName",
        type: "string",
        maxLength: 3,
      },
      telephone: {
        title: "telephone",
        type: "string",
      },
      staticArray: {
        title: "staticArray",
        type: "array",
        items: [
          {
            title: "item1",
            type: "string",
          },
          {
            title: "item2",
            type: "number",
          },
        ],
      },
      singleTypeArray: {
        title: "singleTypeArray",
        type: "array",
        items: {
          type: "string",
        },
      },
    },
  },
  uiSchema: {
    title: "A registration form",
    properties: {
      firstName: {
        title: "First name",
      },
      lastName: {
        title: "Last name",
      },
      telephone: {
        title: "Telephone",
      },
    },
  },
  default: {
    firstName: "Chuck",
    lastName: "Norris",
    age: 75,
    bio: "Roundhouse kicking asses since 1940",
    password: "noneed",
    singleTypeArray: ["zzh"],
    multiSelectArray: [],
  },
};
