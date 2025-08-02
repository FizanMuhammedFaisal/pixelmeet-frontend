export const formatBytes = (bytes: number) => {
  if (bytes === 0) return '0 Bytes'

  const units = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  const file = bytes / Math.pow(1024, i)
  return `${file.toFixed(2)}${units[i]}`
}
