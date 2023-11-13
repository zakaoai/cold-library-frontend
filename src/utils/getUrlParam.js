export default function getUrlParam(endpointPath) {
  let replacedEndpointPath = endpointPath
  let found = true
  const params = new Set()
  do {
    const extract = replacedEndpointPath.substring(
      replacedEndpointPath.indexOf("{") + 1,
      replacedEndpointPath.indexOf("}")
    )

    if (extract) {
      params.add(extract)

      const regEx = new RegExp(`(\\w*{${extract}}\\w*)`, "g")
      replacedEndpointPath = replacedEndpointPath.replace(regEx, extract)
    } else {
      found = false
    }
  } while (found)

  return params
}
