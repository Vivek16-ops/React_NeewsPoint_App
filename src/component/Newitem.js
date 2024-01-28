import React, { Component } from 'react'

export default class Newitem extends Component {
    render() {
        let { title, description, imageUrl, newsUrl, author, pulishat, source } = this.props
        return (
            <div>
                <div className="card">
                    <span className="position-absolute translate-middle badge rounded-pill bg-danger" style={{ left: "85%", top: "15px", zIndex: 2 }}>
                        {source}
                    </span>
                    <img src={imageUrl ? imageUrl : "https://cdn.elearningindustry.com/wp-content/uploads/2022/11/shutterstock_1798672534.jpg"} className="card-img-top" alt="no preview available" />
                    <div className="card-body">
                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text">{description}...</p>
                        <a href={newsUrl} target='_blank' className="btn btn-sm btn-primary">Read More</a>
                        <p className="card-text my-1"><small className="text-muted">By {author ? author : "UnKnown"} on {new Date(pulishat).toUTCString()}</small></p>
                    </div>
                </div>
            </div >
        )
    }
}
