fetch("assets/StatusJSON.json")
  .then((res) => res.json())
  .then((json) => console.log(json));