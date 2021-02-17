 export const currentFixed = (current,number = 2)=> {

    return current.toFixed(number).replace(/\d(?=(\d{3})+\.)/g, '$&,')
}
