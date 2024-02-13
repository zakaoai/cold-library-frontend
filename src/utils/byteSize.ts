export const formatByteSize = (size: string, type: string, round = 1) => {
  const typeSize = ["Bytes", "KiB", "MiB", "GiB", "TiB"]

  const typeIndex = typeSize.indexOf(type)
  const intSize = parseInt(size)

  const i = Math.floor(Math.log(intSize) / Math.log(1024))

  if (i === 0) {
    return size + " " + type
  }

  return (intSize / Math.pow(1024, i)).toFixed(round) + " " + typeSize[typeIndex + i]
}

export const getBytesSize = (size: string, type: string) => {
  const typeSize = ["Bytes", "KiB", "MiB", "GiB", "TiB"]

  const typeIndex = typeSize.indexOf(type)

  return parseInt(size) * Math.pow(1024, typeIndex)
}
