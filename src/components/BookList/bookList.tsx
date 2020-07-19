import * as React from 'react';
import "./bookList.scss";
import BookCard from '../BookCard/bookCard';

interface Props {
    bookListProps: Array<bookVolume>
}
class BookList extends React.Component<Props>{
    render() {
        console.log(this.props);
        return (
            <div className="book-list-container">
                {
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
                }
            </div>
        )
    }
}

export default BookList