export default function Category_single_card_update(props) {
    const cardClassName = props.enableFocus ? "card-body cardFocus" : "card-body";

    return (
        <div className="col-sm-6 col-lg-3 my-2 d-flex justify-content-center">
            <div className="card">
                <div className={cardClassName}>
                    <h6>{props.item.catname}</h6>
                    <p className="card-text">{props.item.catdescription}</p>
                </div>

                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <b>Cat ID:</b> {props.item.catid.toString()}
                    </li>                    
                </ul>

            </div>
        </div>
    );
}