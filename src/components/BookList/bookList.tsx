import * as React from 'react';
import "./bookList.scss";
import BookCard from '../BookCard/bookCard';

interface Props {
    bookListProps: Array<bookVolume>
}
class BookList extends React.Component<Props>{
    render() {
        console.log(this.props);
        let conunt:number = this.props.bookListProps.length
        console.log(conunt);

        return (
            <div className="book-list-container">
                {
                   this.props.bookListProps.length>0?
                    this.props.bookListProps.map((item: bookVolume, i: number) => {
                        return (
                            <BookCard
                                key={i}
                                author={item.author}
                                title={item.title}
                                imageUrl={item.imageUrl}
                                pageCount={item.pageCount}
                            />
                        )
                    })
                    :
                    <p>Your search did not return any results. <br/>Try checking your spelling or use more general terms.</p>
                }
            </div>
        )
    }
}

export default BookList