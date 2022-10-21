export function getFileType(file: File) {
  const segments = file.type.split('/');
  return segments[segments.length - 1];
}
