const GetItem = (props) => {

    return (
        (props.array.filter(item => item.id === props.id))[0] ?
        (props.array.filter(item => item.id === props.id))[0].title :
        null
    )
    // var element = null
    // props.array.map(item => {
    //     if (item.id === props.id) {
    //       element = item.title
    //     }
    // })
    // return element

}

export default GetItem;
