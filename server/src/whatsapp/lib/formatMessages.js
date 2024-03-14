/*MESSAGES = []<String> */
/*contact : {phone : 123213,var1 : "asd"} */
export const formatMessages = (contact, messages) => {
  const keys = Object.keys(contact);

  const exp = new RegExp("({" + keys.join("}|{") + "})", "g");

  const formatedMessages = messages.map((message) => {
    return message.replace(exp, (toReplace) => {
      const keyValue = toReplace.slice(1, toReplace.length - 1);

      const data = contact[keyValue];

      return data;
    });
  });

  return formatedMessages;
};
