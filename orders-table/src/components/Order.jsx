export default function Order(props){
    return(
        <tbody>
            <tr>
                <td>{props.order.id}</td>
                <td>{props.order.customer.name} <br /> {props.order.customer.city}</td>
                <td>{props.order.addedby}</td>
                <td>{props.order.reference}</td>
                <td>{props.order.branch}</td>
                <td>{props.order.service}</td>
                <td>{props.order.status}</td>
                
            </tr>
        </tbody>
    )
}