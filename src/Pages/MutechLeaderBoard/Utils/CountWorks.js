function CountWorks(list){
    let count = 0
    for(let item of list){
        if (!/^done$/i.test(item.replace(/[:-\s]/g, '')))
            ++count
    }
    return count
}
export default CountWorks