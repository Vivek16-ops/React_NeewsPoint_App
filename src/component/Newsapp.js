import React, { Component } from 'react'
import Newitem from './Newitem'
import Loading from './Loading'
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

export default class Newsapp extends Component {

    // It Runs first 
    constructor(props) {
        super(props);
        this.state = {
            article: [],
            loading: true,
            page: 1,
            totalResult: 0
        }
        document.title = `NewsPoint-${this.capitalizeFirstLetter(this.props.category)}`
    }

    // Function to capatilize first letter here it use in headings
    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    async UpdatePage() {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.api_key}&page=${this.state.page}&pageSize=${this.props.pageSize}`
        this.setState({ loading: true })
        this.props.setProgress(10)
        let urlData = await fetch(url)
        let parseData = await urlData.json()
        this.setState({ article: parseData.articles, totalResult: parseData.totalResults, loading: false })
        this.props.setProgress(100)
    }

    // Runs after render function 
    async componentDidMount() {
        this.UpdatePage();
    }

    prevPage = async () => {
        console.log("Previous Button Clicked")
        if (this.state.page <= 1) {
            alert("No Previous page is avaialble you are already on the first page")
        } else {
            this.setState({ page: this.state.page - 1 })
            this.UpdatePage();
        }
    }

    nextPage = async () => {
        console.log("Next Button Clicked")
        if (this.state.page + 1 > Math.ceil(this.state.totalResult / this.props.pageSize)) {
            alert("No Further Section is Available")
        } else {
            this.setState({ page: this.state.page + 1 })
            this.UpdatePage();
        }
    }


    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 })
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.api_key}&page=${this.state.page}&pageSize=${this.props.pageSize}`
        let urlData = await fetch(url)
        let parseData = await urlData.json()
        this.setState({ article: this.state.article.concat(parseData.articles), totalResult: parseData.totalResults })
    }

    render() {
        return (
            <>
                <h1 className='text-center my-3'>NewsPoints- Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
                {this.state.loading && <Loading />}

                <InfiniteScroll
                    dataLength={this.state.article.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.page <= Math.ceil(this.state.totalResult / this.props.pageSize)}
                    loader={<Loading />}>

                    <div className="container">
                        <div className="row">
                            {/* Here we use map to prevent overide the items becoz mapping return new element each time  */}
                            {this.state.article.map((element) => {
                                return <div className="col-md-4 md-y" key={element.url}>
                                    <Newitem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : " "} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} pulishat={element.publishedAt} source={element.source.name} />
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>


                {/* previous next button  */}
                {/* <div className="container d-flex justify-content-between my-3">
                    <button onClick={this.prevPage} type="button" className="btn btn-dark">&larr; Previous</button>
                    <button onClick={this.nextPage} type="button" className="btn btn-dark">Next &rarr;</button>
                </div> */}
            </>
        )
    }
}

// Providing External Proptypes | We can also provide internal proptype using stattic keyword
Newsapp.propTypes = {
    country: PropTypes.string,
    category: PropTypes.string,
    pageSize: PropTypes.number
};

Newsapp.defaultProps = {
    country: "in",
    category: "general",
    pageSize: 5
};


