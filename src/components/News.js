

import React, { useState,useEffect } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import propTypes from "prop-types";
// import InfiniteScroll from 'react-infinite-scroll-component';

const News =(props)=> {
  

 const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const [articles, setarticles] = useState([])
  const [page, setpage] = useState(1)
  const [loading, setloading] = useState(false)
  const [totalresults, settotalresults] = useState(0)

  

  

  const updatenews= async()=> {
    props.setprogress(10);
    // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=6e8a3150a2c94a558d878fd651af6965&page=${this.state.page}&pageSize=${props.pageSize}`;

    let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=17f95f155bf6424caed53ec583edb8b1&page=${page}&pageSize=${props.pageSize}`;
    
    setloading(true)
    let data = await fetch(url);
    props.setprogress(30);
    let parsedata = await data.json();
    props.setprogress(70);

    setarticles(parsedata.articles);
    settotalresults(parsedata.totalresults);
    setloading(false);

    
    props.setprogress(100);
  }

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(
      props.category
    )}-NewsPanda`;
   updatenews();
    
  }, [])
  
  

  const prevpage = async () => {
    console.log("prev");
    setpage(page - 1)
    updatenews();
  };

  const nextpage = async () => {
    console.log("next");
    setpage(page+1)
    updatenews();
  };

  // fetchMoreData = async () => {
  //   this.setState({ page: this.state.page + 1 });
  //   let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=6e8a3150a2c94a558d878fd651af6965&page=${this.state.page}&pageSize=${props.pageSize}`;
  //   this.setState({ loading: true });
  //   let data = await fetch(url);
  //   let parsedata = await data.json();
  //   this.setState({
  //     articles: this.state.articles.concat(parsedata.articles),
  //     totalResults: parsedata.totalResults,
  //     loading: false,
  //   });
  // };

  
    return (
      <div className="container my-3">
        <h1 className="text-center" style={{ margin: "33px", marginTop:"86px"}}>

          NewsPanda Top Headlines of{" "}
          {capitalizeFirstLetter(props.category)}
        </h1>
        {loading && <Spinner />}

        {/* <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
          > */}

        <div className="row">
          {!loading && articles.map((element) => {
            return (
              <div className="col-md-4 my-2 " key={element.url}>
                <Newsitem
                  title={element.title.slice(0, 44)}
                  description={element.description}
                  imgurl={element.urlToImage}
                  newsreadmore={element.url}
                  author={element.author}
                  date={element.publishedAt}
                  source={element.source.name}
                />
              </div>
            );
          })}
        </div>
        <div className="container d-flex justify-content-between">
          <button disabled={page <= 1} type="button" className="btn btn-dark" onClick={prevpage}>&larr; previous</button>
          <button disabled={page + 1 > 38} type="button" className="btn btn-dark" onClick={nextpage}>next &rarr; </button>
        </div>
      </div>
    )
  
}

export default News;
News.defaultProps = {
  country: "in",
  pageSize: 6,
  category: "general",
};
News.propTypes = {
  country: propTypes.string,
  pageSize: propTypes.number,
  category: propTypes.string,
};