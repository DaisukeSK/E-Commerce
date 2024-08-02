
export const sha256 = async(password:string)=>{

    const p:Array<string> = password.split('')

    p.splice(p.length-1, 0, p[0])
    p.splice(p.length-3, 0, p[1])

    p.splice(1, 0, p[p.length-1])
    p.splice(3, 0, p[p.length-3])
    
    const merged:string = p.join('')

    const uint8:Uint8Array  = new TextEncoder().encode(merged)
    const digest:ArrayBuffer = await crypto.subtle.digest('SHA-256', uint8)
    return Array.from(new Uint8Array(digest)).map(v => v.toString(16).padStart(2, '0')).join('')
}

export const escapeSpecilChars=(string:string | undefined):string | undefined=>{

    let str=string;
    
    while(str!.includes('<')||str!.includes('>')||str!.includes('&')||str!.includes('"')||str!.includes("'")){
        str=str!.replace('<','*lt')
        .replace('>','*gt')// .replaceAll() method is not available somehow.
        .replace('&','*amp')
        .replace('"','*quot')
        .replace("'",'*apos')
    }
    return str;
}

export const decode=(string:string):string=>{

    let str=string;
    
    while(str.includes('*lt')||str.includes('*gt')||str.includes('*amp')||str.includes('*quot')||str.includes('*apos')){
        str=str.replace('*lt','<')
        .replace('*gt','>')// .replaceAll method is not available somehow.
        .replace('*amp','&')
        .replace('*quot','"')
        .replace('*apos',"'")
    }
    return str;
}