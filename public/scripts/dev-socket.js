const source = new EventSource("/devSocket")  
source.addEventListener("message", (e) => console.log(e))