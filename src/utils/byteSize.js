export function formatByteSize(size, type, round = 1) {
  const typeSize = ["Bytes", "KiB", "MiB", "GiB", "TiB"];

  const typeIndex = typeSize.indexOf(type);

  const i = parseInt(Math.floor(Math.log(size) / Math.log(1024)));

  if (i == 0) {
    return size + " " + type;
  }

  return (size / Math.pow(1024, i)).toFixed(round) + " " + typeSize[typeIndex + i];
}

export function getBytesSize(size, type) {
  const typeSize = ["Bytes", "KiB", "MiB", "GiB", "TiB"];

  const typeIndex = typeSize.indexOf(type);

  return size * Math.pow(1024, typeIndex);
}
