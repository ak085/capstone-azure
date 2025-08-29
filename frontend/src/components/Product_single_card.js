
export default function Product_single_card(props) {

    return (
        <div className="col-sm-6 col-lg-3 my-2 d-flex justify-content-center">
            <div className="card">
                <img 
                    src={props.item.imageurl} 
                    className="card-img-top" 
                    alt="Picture of item"
                    onError={(e) => {
                        e.target.src = "../images/image1.png";
                        e.target.alt = "Image not available";
                    }}
                ></img>
                <div className="card-body">
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id={'productItemCheckbox_' + props.listIndex.toString()}
                        ></input>
                        <label className="form-check-label">
                            <h6>{props.item.name}</h6>
                        </label>
                    </div>
                    <p className="card-text">{props.item.description}</p>
                </div>

                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <b>Brand:</b> {props.item.brand}
                    </li>
                    <li className="list-group-item">
                        <b>Created:</b> {props.item.date}
                    </li>
                    <li className="list-group-item">
                        <b>Product ID:</b> {props.item.productid.toString()}
                    </li>
                    <li className="list-group-item">
                        <b>Cat ID:</b> {props.item.catid.toString()}
                    </li>                    
                </ul>

            </div>
        </div>
    );
}