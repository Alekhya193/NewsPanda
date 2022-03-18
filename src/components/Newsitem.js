import React, { Component } from 'react'

export class Newsitem extends Component {
    render() {
        let {title, description,imgurl,newsreadmore,author,date,source}= this.props;
        return (
            <div>
                <div className="card" >
                    <img src={imgurl} className="card-img-top" alt="..."/>
                        <div className="card-body">
                            <h5 className="card-title">{title}...<span className="badge rounded-pill bg-info text-dark">{source}</span></h5>
                            <p className="card-text">{description}</p>
                            <a href={newsreadmore} className="btn btn-sm btn-primary">Read more</a>
                            <p className="card-text"><small className="text-muted">By {author?author:"unknown"} on {new Date(date).toGMTString()}</small></p>
                        </div>
                </div>
            </div>
        )
    }
}

export default Newsitem