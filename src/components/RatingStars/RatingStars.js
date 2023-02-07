

function RatingStars(props) {
    let fstars = Math.floor(props.star);
    let hstars = Math.floor(props.star.toString().split('.').length / 2);
    let nstars = 5 - fstars - hstars;

    let rating_class = "ratings";

    let stars = [];
    for (let i = 0; i < fstars; i++)
        stars.push(<i className="bi bi-star-fill rating-color" key={"fstar" + i}></i>);
    for (let i = 0; i < hstars; i++)
        stars.push(<i className="bi bi-star-half rating-color" key={"hstar" + i}></i>)
    for (let i = 0; i < nstars; i++)    
        stars.push(<i className="bi bi-star" key={"nstar" + i}></i>)

    if(props.optionClass !== undefined)
        rating_class += " " + props.optionClass;
        
    return (
        <span className={rating_class}>
            {stars}
        </span>
    );
}

export default RatingStars;