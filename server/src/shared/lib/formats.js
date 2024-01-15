

export const nomPropio = (string) => {
    return string.toLowerCase().replaceAll(/((\s\w)|^.)/g,e => " " + e.trim().toUpperCase()).trim()

} 

