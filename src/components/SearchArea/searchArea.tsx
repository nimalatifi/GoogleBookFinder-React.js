import * as React from 'react';
import "./searchArea.scss";
import BookList from '../BookList/bookList';
import LoadingSpinner from '../LoadingSpiner/loadingSpiner'


interface MainProps{}
interface State {
    bookList: Array<bookVolume>,
    searchFiled: string,
    isLoading: boolean,
    maxResult: number
};
export default class SearchArea extends React.Component<MainProps, State> {

    state: State = {
        bookList: [],
        searchFiled: '',
        isLoading: false,
        maxResult: 10
    };

    constructor(props:MainProps) {
        super(props)
        // this.handleSearch = this.handleSearch.bind(this);
        // this.searchBook = this.searchBook.bind(this);
      }

    async getBooksFromGoogle() {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${this.state.searchFiled}&maxResults=${this.state.maxResult}`);
        const data = await response.json();
        return data;
    }


    searchBook = async (e: React.FormEvent<HTMLFormElement>) => {
       
        e.preventDefault();
        let tempArr:Array<bookVolume>;
        tempArr=[];
        this.setState({isLoading:true});
        this.setState({bookList:[]});
        if (this.state.searchFiled.trim() != '') {
            await this.getBooksFromGoogle()
                .then(result => {   
                    result.items.forEach((item: any) => {
                        tempArr.push({
                            title:  item.volumeInfo.title!= null && item.volumeInfo.title.length ? item.volumeInfo.title : "no-Tile",
                            imageUrl: item.volumeInfo.imageLinks!= null ? item.volumeInfo.imageLinks.thumbnail : "./src/img/no-image.png",
                            pageCount: item.volumeInfo.pageCount!= null ? item.volumeInfo.pageCount : "#0",
                            author: item.volumeInfo.authors!= null && item.volumeInfo.authors.length ? item.volumeInfo.authors[0] : "no-author"
                        })
                    })
                    this.setState({bookList:tempArr})
                })
                .catch(error => {
                    console.log('Error on GoogleApi response!');
                    console.log(error);
                })
        } else {
            console.log("search term is null")
        }
        this.setState({isLoading:false});
    }

    handleSearch = (e: React.FormEvent<HTMLInputElement>) => {
        this.setState({ searchFiled: e.currentTarget.value })
    }

    render() {
        return (
            <div>
                <section className="search-area">
                    <div className="search-input-container">
                        <form onSubmit={this.searchBook} action="">
                            <input onChange={this.handleSearch} id="searchInput" className="search-input" placeholder="Find book ..." type="text" />
                            <button className="search-btn" disabled={this.state.isLoading} type="submit">Find</button>
                        </form>
                    </div>
                </section>
                <div className="main-area">
                    {this.state.isLoading ? <LoadingSpinner/> : <BookList bookListProps={this.state.bookList} />}
                </div>
            </div>
        )
    }
}
