import * as React from 'react';
import "./searchArea.scss";
import BookCard from '../BookCard/bookCard';


interface State {
    bookList: Array<bookVolume>,
    searchFiled: string,
    searchButtonDisabled: boolean,
    maxResult: number
};
export default class SearchArea extends React.Component {

    state: State = {
        bookList: [],
        searchFiled: '',
        searchButtonDisabled: false,
        maxResult: 10
    };



    async getBooksFromGoogle() {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${this.state.searchFiled}&maxResults=${this.state.maxResult}`);
        const data = await response.json();
        return data;
    }


    searchBook = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (this.state.searchFiled.trim() != '') {
            await this.getBooksFromGoogle()
                .then(result => {
                    this.state.bookList = [];
                    result.items.forEach((item: any) => {
                        this.state.bookList.push({
                            title: item.volumeInfo.title,
                            imageUrl: item.volumeInfo.imageLinks.thumbnail,
                            pageCount: item.volumeInfo.pageCount,
                            author: item.volumeInfo.authors[0]
                        })
                    })
                })
                .catch(error => {
                    console.log('Error on GoogleApi response!');
                    console.log(error);
                })
        } else {
            console.log("search term is null")
        }

        console.log(this.state.bookList);

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
                            <button className="search-btn" disabled={this.state.searchButtonDisabled} type="submit">Find</button>
                        </form>
                    </div>
                </section>
                <div className="main-area">
                    <div className="loader-container hide">
                        <div className="loader"></div>
                    </div>

                    <div className="book-list-container">
                    
                            
                           { 
                           this.state.bookList.map((item:bookVolume ,i:number)=> {
                                console.log("dd");
                                  return  <BookCard 
                                            key={i} 
                                            author={item.author} 
                                            title={item.title} 
                                            imageUrl={item.imageUrl}
                                            pageCount={item.pageCount}
                                        />
                              })
                            }
                        
                    </div>
                </div>
            </div>
        )
    }
}
