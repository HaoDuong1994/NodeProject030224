const handleAdmin400Error = (error) => {
  let listError = {
    name: "",
    email: "",
    address: "",
    password: "",
    image: "",
  };
  const handleError = Object.values(error.errors);
  handleError.forEach((element) => {
    listError[element.properties.path] = element.properties.message;
  });
  return listError;
};
module.exports = {
  handleAdmin400Error,
};
