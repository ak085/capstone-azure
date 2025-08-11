
export default function Product_single_card_update(props) {
    const cardClassName = props.enableFocus ? "card-body cardFocus" : "card-body";

    return (
        <div className="col-sm-6 col-lg-3 my-2 d-flex justify-content-center">
            <div className="card">
                <img src={"../images/image1.png"} className="card-img-top" alt="Picture of item"></img>
                <div className={cardClassName}>
                    <h6>{props.item.name}</h6>
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