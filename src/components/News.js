

import React, { Component } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import propTypes from "prop-types";
// import InfiniteScroll from 'react-infinite-scroll-component';

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 6,
    category: "general",
  };
  static propTypes = {
    country: propTypes.string,
    pageSize: propTypes.number,
    category: propTypes.string,
  };

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  constructor(props) {
    super(props);
    this.state = {
      articles:[],
      
      page: 1,
      loading: false,
      // totalResults: 0,
    };
    document.title = `${this.capitalizeFirstLetter(
      this.props.category
    )}-NewsPanda`;
  }

  async updatenews() {
    this.props.setprogress(10);
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6e8a3150a2c94a558d878fd651af6965&page=${this.state.page}&pageSize=${this.props.pageSize}`;

    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=17f95f155bf6424caed53ec583edb8b1&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setprogress(30);
    let parsedata = await data.json();
    this.props.setprogress(70);
    this.setState({
      articles: parsedata.articles,
      totalResults: parsedata.totalResults,
      loading: false,
    });
    this.props.setprogress(100);
  }

  async componentDidMount() {
    this.updatenews();
  }

  prevpage = async () => {
    console.log("prev");

    this.setState({ page: this.state.page - 1 });
    this.updatenews();
  };

  nextpage = async () => {
    console.log("next");

    this.setState({ page: this.state.page + 1 });
    this.updatenews();
  };

  // fetchMoreData = async () => {
  //   this.setState({ page: this.state.page + 1 });
  //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6e8a3150a2c94a558d878fd651af6965&page=${this.state.page}&pageSize=${this.props.pageSize}`;
  //   this.setState({ loading: true });
  //   let data = await fetch(url);
  //   let parsedata = await data.json();
  //   this.setState({
  //     articles: this.state.articles.concat(parsedata.articles),
  //     totalResults: parsedata.totalResults,
  //     loading: false,
  //   });
  // };

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center" style={{ margin: "33px" }}>

          NewsPanda Top Headlines of{" "}
          {this.capitalizeFirstLetter(this.props.category)}
        </h1>
        {this.state.loading && <Spinner />}

        {/* <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
          > */}

        <div className="row">
          {!this.state.loading && this.state.articles.map((element) => {
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
          <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.prevpage}>&larr; previous</button>
          <button disabled={this.state.page + 1 > 38} type="button" className="btn btn-dark" onClick={this.nextpage}>next &rarr; </button>
        </div>
      </div>
    )
  }
}

export default News;
