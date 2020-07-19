import * as React from 'react'
import "./bookCard.scss";
interface Props{
    title: string;
    imageUrl: string;
    pageCount: string;
    author: string;
}
class BookCard extends React.Component<Props>{
    
    render() {
        console.log("from BookCard:"+ this.props)
        return (
            <div className="book-card">
                <div className="book-cover-container">
                    <img className="book-cover" src={this.props.imageUrl}/>
                </div>
                <h1 className="bookTitle">{this.props.title}</h1>
                <div className="book-details">
                    <h2 className="book-author">{this.props.author}</h2>
                    <p className="book-pages">{this.props.pageCount}</p>
                </div>
            </div>
        )
    }
}
export default BookCard;