
export default function User_single_card(props) {
    return (
        <div className="col-sm-6 col-lg-3 my-2 d-flex justify-content-center">
            <div className="card">
                <div className="card-body">
                    <h6>{props.item.name}</h6>
                </div>

                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <b>Role:</b> {props.item.role}
                    </li>  
                    <li className="list-group-item">
                        <b>Email:</b> {props.item.email}
                    </li>  
                    <li className="list-group-item">
                        <b>User ID:</b> {props.item.userid.toString()}
                    </li>                  
                </ul>

                <div className="card-body">
                    <div className="d-grid gap-2">
                        <button 
                            className="btn btn-warning btn-sm"
                            onClick={() => {
                                console.log('Edit button clicked for user:', props.item);
                                props.onEdit(props.item);
                            }}
                        >
                            Edit
                        </button>
                        <button 
                            className="btn btn-danger btn-sm"
                            onClick={() => {
                                console.log('Delete button clicked for user:', props.item);
                                props.onDelete(props.item.userid, props.item.name);
                            }}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}