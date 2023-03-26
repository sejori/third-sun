const source = new EventSource("/devSocket")  
const reload = async () => {
  await new Promise(res => setTimeout(250, res()))
  window.location.reload()
}

source.addEventListener("message", (e) => console.log(e))
source.addEventListener("close", reload)
source.addEventListener("error", reload)