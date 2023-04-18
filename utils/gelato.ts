let gelato_api_key = ""
if (Deno.env.get("DENO_REGION")) {
  const {
    GELATO_API_KEY
  } = Deno.env.toObject()
  gelato_api_key = GELATO_API_KEY
} else {
  gelato_api_key = await Deno.readTextFile(new URL("../keys/gelato.txt", import.meta.url))
}

const getCatalogs = async () => {
  const response = await fetch("https://product.gelatoapis.com/v3/catalogs", {
    headers: {
      "X-API-KEY": gelato_api_key
    }
  })
  return response.json()
}

const getProducts = async (catalog: string) => {
  const response = await fetch(`https://product.gelatoapis.com/v3/catalogs/${catalog}/products:search`, {
    method: "POST",
    headers: {
      "X-API-KEY": gelato_api_key
    }
  })
  return response.json()
  
}

console.log(await getProducts("t-shirts"))

export { 
  gelato_api_key,
  getCatalogs,
  getProducts
}