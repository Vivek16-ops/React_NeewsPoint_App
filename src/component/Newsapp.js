import React, { useEffect, useState } from 'react'
import Newitem from './Newitem'
import Loading from './Loading'
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

const Newsapp = (props) => {

    // setting up required state 
    const [article, setArticle] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResult, setTotalResult] = useState(0);
    // document.title = `NewsPoint-${capitalizeFirstLetter(props.category)}`


    // Function to capatilize first letter here it use in headings
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const UpdatePage = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.api_key}&page=${page}&pageSize=${props.pageSize}`
        setLoading({ loading: true })
        props.setProgress(10)
        let urlData = await fetch(url)
        let parseData = await urlData.json()
        setArticle(parseData.articles)
        setTotalResult(parseData.totalResults)
        setLoading(false)
        props.setProgress(100)
    }

    // Runs after render and changes 
    useEffect(() => {
        UpdatePage();
    },[]);

    const prevPage = async () => {
        console.log("Previous Button Clicked")
        if (page <= 1) {
            alert("No Previous page is avaialble you are already on the first page")
        } else {
            setPage(page - 1)
            UpdatePage();
        }
    }

    const nextPage = async () => {
        console.log("Next Button Clicked")
        if (page + 1 > Math.ceil(totalResult / props.pageSize)) {
            alert("No Further Section is Available")
        } else {
            setPage(page + 1)
            UpdatePage();
        }
    }


    const fetchMoreData = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.api_key}&page=${page+1}&pageSize=${props.pageSize}`
        setPage(page + 1)
        let urlData = await fetch(url)
        let parseData = await urlData.json()
        setArticle(article.concat(parseData.articles))
        setTotalResult(parseData.totalResults)
    }

    return (
        <>
            <h1 className='text-center' style={{marginTop:"80px",marginBottom:"20px"}}>NewsPoints- Top {capitalizeFirstLetter(props.category)} Headlines</h1>
            {loading && <Loading />}

            <InfiniteScroll
                dataLength={article.length}
                next={fetchMoreData}
                hasMore={page <= Math.ceil(totalResult / props.pageSize)}
                loader={<Loading />}>

                <div className="container">
                    <div className="row">
                        {/* Here we use map to prevent overide the items becoz mapping return new element each time  */}
                        {article.map((element) => {
                            return <div className="col-md-4 md-y" key={element.url}>
                                <Newitem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : " "} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} pulishat={element.publishedAt} source={element.source.name} />
                            </div>
                        })}
                    </div>
                </div>
            </InfiniteScroll>


            {/* previous next button  */}
            {/* <div className="container d-flex justify-content-between my-3">
                    <button onClick={prevPage} type="button" className="btn btn-dark">&larr; Previous</button>
                    <button onClick={nextPage} type="button" className="btn btn-dark">Next &rarr;</button>
                </div> */}
        </>
    )
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


export default Newsapp