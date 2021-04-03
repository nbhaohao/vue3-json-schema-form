export default {
  name: "渲染 array, object 的 json 数据",
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
