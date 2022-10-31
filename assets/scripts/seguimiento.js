fetch('assets/status.json')
.then(response => response.json())
.then(json => console.log(json))